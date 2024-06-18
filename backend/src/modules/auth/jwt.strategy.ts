import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './dtos';
import { ConfigKeyPaths } from '~/config';
import { UserRepository } from '../users/model/user.repository';
import { UserEntity } from '../users/model/user.entity';
import { UnauthorizedCustomException } from '~/common/http/exceptions/unauthorized.exception';
import { UserStatus } from '../users/enums/user-status.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    configService: ConfigService<ConfigKeyPaths>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('security.jwtAccess'),
    });
  }

  async validate({ sub }: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: sub });
    if (!user) {
      throw new UnauthorizedCustomException();
    }
    if (user.status == UserStatus.Inactive) {
      throw new UnauthorizedCustomException('Inactive User');
    }
    if (user.status == UserStatus.Blocked) {
      throw new UnauthorizedCustomException('Blocked User');
    }
    return user;
  }
}
