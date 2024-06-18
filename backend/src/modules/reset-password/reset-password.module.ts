import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordEntity } from './model/reset-password.entity';
import { ResetPasswordService } from './reset-password.service';
import { JwtModule } from '@nestjs/jwt';
import { ResetPasswordRepository } from './model/reset-password.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResetPasswordEntity]),
    JwtModule.register({}),
  ],
  providers: [ResetPasswordService, ResetPasswordRepository],
  exports: [ResetPasswordService, ResetPasswordRepository],
})
export class ResetPasswordModule {}
