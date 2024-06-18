import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPService } from './otp.service';
import { OTPRepository } from './model/otp.repository';
import { OTPEntity } from './model/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OTPEntity])],
  providers: [OTPService, OTPRepository],
  exports: [OTPService, OTPRepository],
})
export class OTPModule {}
