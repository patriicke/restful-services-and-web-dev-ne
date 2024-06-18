/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { AuthCredentialsRequestDto, LoginResponseDto } from './dtos';
import { UserStatus } from '~/modules/users/enums/user-status.enum';
import { UserMapper } from '~/modules/users/users.mapper';
import { AuthRegisterRequestDto } from './dtos/auth-register.dto';
import { LogoutRequestDto } from './dtos/logout.dto';
import { REQUEST } from '@nestjs/core';
import { RoleRepository } from '../roles/model/role.repository';
import { TokensService } from '../tokens/tokens.service';
import { MailerService } from '~/shared/mailer/mailer.service';
import { UserEntity } from '../users/model/user.entity';
import {
  BadRequestCustomException,
  ConflictCustomException,
  InternalServerErrorCustomException,
  NotFoundCustomException,
} from '~/common/http';
import { UserRequest } from '~/types/request';
import { UserRepository } from '../users/model/user.repository';
import { ResponseService } from '~/shared/response/response.service';
import { ResponseDto } from '~/common/dtos';
import { loginTemplate } from '~/template/auth';
import { registerTemplate } from '~/template/auth/register.template';
import { ConfigService } from '@nestjs/config';
import { AllConfigType, IAppConfig } from '~/config';
import { RefreshTokenRequestDto } from '../tokens/dto/refresh-token-request.dto';
import { TokenResponseDto } from '../tokens/dto/token-response.dto';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @Inject(REQUEST) private req: UserRequest,
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private tokenService: TokensService,
    private responseService: ResponseService,
    private mailService: MailerService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  /**
   * User authentication
   * @param authCredentialsDto {AuthCredentialsRequestDto}
   * @returns {Promise<LoginResponseDto>}
   */
  public async login(
    authCredentialsRequestDto: AuthCredentialsRequestDto,
  ): Promise<ResponseDto<LoginResponseDto>> {
    const { username, password } = authCredentialsRequestDto;

    const user: UserEntity =
      await this.userRepository.findUserByUsernameOrEmail(username);

    if (!user) throw new NotFoundCustomException('User not found');

    const passwordMatch = await user.validatePassword(password);

    if (!passwordMatch) {
      throw new BadRequestCustomException('Invalid credentials');
    }

    if (user.status == UserStatus.Blocked) {
      throw new BadRequestCustomException('User blocked');
    }

    const tokens = await this.tokenService.generateTokens(user);

    const userDto = await UserMapper.toDto(user, {
      roles: true,
    });

    // await this.mailService.sendEMail({
    //   body: loginTemplate({
    //     firstName: user.firstName,
    //     companyName: this.configService.get<IAppConfig>('app').name,
    //   }),
    //   subject: `${this.configService.get<IAppConfig>('app').name} Login Notification`,
    //   to: user.email,
    // });

    return this.responseService.makeResponse({
      message: 'Logged in successfully',
      payload: { user: userDto, tokens },
    });
  }

  public async register(
    authRegisterDto: AuthRegisterRequestDto,
  ): Promise<ResponseDto<LoginResponseDto>> {
    const { email, username } = authRegisterDto;

    const userExists: UserEntity | false = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (userExists) throw new ConflictCustomException('User already exists');

    const user: UserEntity = this.userRepository.create(authRegisterDto);

    const userRole = await this.roleRepository.findOneBy({ name: 'user' });

    user.roles = Promise.all([userRole]);

    const savedUser = await this.userRepository.save(user);

    const tokens = await this.tokenService.generateTokens(savedUser);

    const userDto = await UserMapper.toDto(user, {
      roles: true,
    });

    // await this.mailService.sendEMail({
    //   body: registerTemplate({
    //     firstName: user.firstName,
    //     companyName: this.configService.get<IAppConfig>('app').name,
    //   }),
    //   subject: `Welcome to ${this.configService.get<IAppConfig>('app').name}: Account Created!`,
    //   to: user.email,
    // });

    return this.responseService.makeResponse({
      message: 'Logged in successfully',
      payload: {
        user: userDto,
        tokens,
      },
    });
  }

  public async logout(
    logoutRequestDto: LogoutRequestDto,
  ): Promise<ResponseDto<null>> {
    try {
      const { refreshToken } = logoutRequestDto;
      await this.tokenService.deactivateRefreshToken(refreshToken);
      return this.responseService.makeResponse({
        message: 'Logged out successfully',
        payload: null,
      });
    } catch (error) {
      throw new InternalServerErrorCustomException();
    }
  }

  public async logoutAll(): Promise<ResponseDto<null>> {
    try {
      const user = this.req.user;
      await this.tokenService.deactivateAllRefreshTokens(user.id);
      return this.responseService.makeResponse({
        message: 'Logged out from all devices successfully',
        payload: null,
      });
    } catch (error) {
      throw new InternalServerErrorCustomException();
    }
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<ResponseDto<TokenResponseDto>> {
    try {
      return this.responseService.makeResponse({
        message: 'Token refreshed successfully',
        payload: await this.tokenService.refreshAccessToken(refreshTokenDto),
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorCustomException();
    }
  }
}
