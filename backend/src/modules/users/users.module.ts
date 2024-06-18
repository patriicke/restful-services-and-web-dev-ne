import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ResetPasswordService } from '../reset-password/reset-password.service';
import { OTPModule } from '../otp/otp.module';
import { ResetPasswordModule } from '../reset-password/reset-password.module';
import { UserRepository } from './model/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    OTPModule,
    ResetPasswordModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ResetPasswordService],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
