import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { TokenType } from './enums';
import { TokenEntity } from './model/token.entity';
import { TokenRepository } from './model/token.repository';
import { v4 } from 'uuid';
import { ConfigKeyPaths } from '~/config';
import { UserEntity } from '../users/model/user.entity';
import { JwtPayload } from '../auth/dtos';
import {
  BadRequestCustomException,
  InternalServerErrorCustomException,
  NotFoundCustomException,
} from '~/common/http';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { ResponseDto } from '~/common/dtos';
import { TokenResponseDto } from './dto/token-response.dto';
import { UnauthorizedCustomException } from '~/common/http/exceptions/unauthorized.exception';

@Injectable()
export class TokensService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private jwtService: JwtService,
    private configService: ConfigService<ConfigKeyPaths>,
  ) {}

  async generateRefreshToken(user: UserEntity): Promise<TokenEntity> {
    const refreshTokenData = this.tokenRepository.create({
      id: v4(),
      user,
      type: TokenType.RefreshToken,
    });

    const payload: JwtPayload = {
      sub: user.id,
      tid: refreshTokenData.id,
      type: TokenType.RefreshToken,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('security.jwtRefresh'),
      expiresIn: this.configService.get('security.jwtRefreshExpire'),
    });

    refreshTokenData.token = refreshToken;

    return await this.tokenRepository.save(refreshTokenData);
  }

  async verifyRefreshToken(refreshToken: string): Promise<JwtPayload | null> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get('security.jwtRefresh'),
        },
      );
      const foundToken = await this.tokenRepository.findOneBy({
        id: payload.tid,
        type: TokenType.RefreshToken,
        isActive: true,
      });
      if (!foundToken || !foundToken.isActive)
        throw new NotFoundCustomException();
      return payload;
    } catch (error) {
      await this.tokenRepository.update(
        { token: refreshToken },
        { isActive: false },
      );
      if (error instanceof JsonWebTokenError)
        throw new BadRequestCustomException('Invalid Token!');

      if (error instanceof TokenExpiredError)
        throw new BadRequestCustomException('Token Expired!');

      if (error instanceof NotFoundCustomException)
        throw new NotFoundCustomException('Token Expired!');

      throw new InternalServerErrorCustomException();
    }
  }

  async generateAccessToken(
    user: UserEntity,
    parentId: string,
  ): Promise<TokenEntity> {
    const accessTokenData = this.tokenRepository.create({
      id: v4(),
      user,
      parentId,
      type: TokenType.AccessToken,
    });

    const payload: JwtPayload = {
      sub: user.id,
      tid: accessTokenData.id,
      type: TokenType.AccessToken,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('security.jwtAccess'),
      expiresIn: this.configService.get('security.jwtAccessExpire'),
    });

    accessTokenData.token = refreshToken;

    return await this.tokenRepository.save(accessTokenData);
  }

  async verifyAccessToken(accessToken: string): Promise<JwtPayload | null> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        accessToken,
        {
          secret: this.configService.get('security.jwtAccess'),
        },
      );

      const foundToken = await this.tokenRepository.findOneBy({
        id: payload.tid,
        type: TokenType.AccessToken,
        isActive: true,
      });

      if (!foundToken || !foundToken.isActive)
        throw new NotFoundCustomException('Token Expired!');
      return payload;
    } catch (error) {
      await this.tokenRepository.update(
        { token: accessToken },
        { isActive: false },
      );

      if (error instanceof JsonWebTokenError)
        throw new UnauthorizedCustomException(
          error.message == 'jwt malformed' ? 'Jwt Malformed!' : 'Jwt Expired!',
        );

      throw error;
    }
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<TokenResponseDto> {
    const { refreshToken } = refreshTokenDto;
    try {
      const payload = await this.verifyRefreshToken(refreshToken);

      await this.tokenRepository.update(
        { parentId: payload.tid },
        { isActive: false },
      );

      const accessToken = await this.generateAccessToken(
        new UserEntity({ id: payload.sub }),
        payload.tid,
      );

      return {
        tokens: {
          accessToken: accessToken.token,
          refreshToken,
        },
      };
    } catch (error) {
      await this.tokenRepository.update(
        { token: refreshToken },
        { isActive: false },
      );

      if (error instanceof JsonWebTokenError)
        throw new UnauthorizedCustomException(
          error.message == 'jwt malformed' ? 'Jwt Malformed!' : 'Jwt Expired!',
        );

      throw error;
    }
  }

  async deactivateRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      const payload = await this.verifyRefreshToken(refreshToken);
      await this.tokenRepository.update(
        { id: payload.tid },
        { isActive: false },
      );
      await this.tokenRepository.update(
        { parentId: payload.tid },
        { isActive: false },
      );
      return true;
    } catch (error) {
      await this.tokenRepository.update(
        { token: refreshToken },
        { isActive: false },
      );
      if (error instanceof JsonWebTokenError)
        throw new BadRequestCustomException('Invalid Token!');

      if (error instanceof TokenExpiredError)
        throw new BadRequestCustomException('Token Expired!');
      throw new InternalServerErrorCustomException();
    }
  }

  async deactivateAllRefreshTokens(userId: string): Promise<boolean> {
    try {
      await this.tokenRepository.update({ userId }, { isActive: false });
      return true;
    } catch ({ name }) {
      throw new BadRequestCustomException('Invalid Token Exception');
    }
  }

  async generateTokens(
    user: UserEntity,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = await this.generateRefreshToken(user);
    const accessToken = await this.generateAccessToken(user, refreshToken.id);
    return {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
    };
  }
}
