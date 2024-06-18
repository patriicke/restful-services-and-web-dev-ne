import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EResetPasswordStatus } from './enums/reset-password.status';
import { ResetPasswordRepository } from './model/reset-password.repository';
import { ConfigKeyPaths } from '~/config';
import { UserEntity } from '../users/model/user.entity';

@Injectable()
export class ResetPasswordService {
  constructor(
    private resetPasswordModel: ResetPasswordRepository,
    private configService: ConfigService<ConfigKeyPaths>,
    private jwtService: JwtService,
  ) {}

  async createAndSaveResetPasswordToken(user: UserEntity): Promise<string> {
    const tokenKey = v4();

    await this.resetPasswordModel.save({
      user,
      tokenKey,
    });

    const resetPasswordToken = this.jwtService.sign(
      {
        tokenKey,
        userId: user.id,
      },
      {
        secret: this.configService.get('security.jwtCommonSecret'),
        expiresIn: '5min',
      },
    );

    return resetPasswordToken;
  }

  async findUserId(token: string): Promise<string | false> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('security.jwtCommonSecret'),
      });

      if (!payload) return false;

      const { userId, tokenKey } = payload;

      const resetPassword = await this.resetPasswordModel.findOneBy({
        tokenKey,
      });

      if (
        !resetPassword ||
        resetPassword.status === EResetPasswordStatus.INACTIVE
      ) {
        return false;
      }

      await this.resetPasswordModel.update(
        {
          userId,
          tokenKey,
        },
        {
          status: EResetPasswordStatus.INACTIVE,
        },
      );

      return userId;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
