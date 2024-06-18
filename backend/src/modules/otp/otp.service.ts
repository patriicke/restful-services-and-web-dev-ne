import { Injectable } from '@nestjs/common';
import { EOTPStatus } from './enums/otp.status';
import { OTPEntity } from './model/otp.entity';
import { OTPRepository } from './model/otp.repository';
import { UserEntity } from '../users/model/user.entity';

type CreateOTPType = {
  user: UserEntity;
  otp: number;
  reason?: string;
  validity?: number;
};

type FindOTPType = {
  otp: number;
  user: UserEntity;
};

export type OTPResponse = 'not-found' | 'expired' | 'valid' | 'inactive';

@Injectable()
export class OTPService {
  constructor(private otpRepository: OTPRepository) {}

  // Generate OTP
  generateOTP = (): number => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // Create OTP
  async createOTP({
    otp,
    user,
    validity = 30,
    reason,
  }: CreateOTPType): Promise<OTPEntity> {
    await this.otpRepository.update(
      { userId: user.id, status: EOTPStatus.ACTIVE },
      { status: EOTPStatus.INACTIVE },
    );

    const otpData = await this.otpRepository.save({
      user,
      validity,
      reason,
      otp,
    });

    return otpData;
  }

  // Find OTP
  async findOTP({ otp, user }: FindOTPType): Promise<OTPResponse> {
    const otpData = await this.otpRepository.findOneBy({
      userId: user.id,
      otp,
      status: EOTPStatus.ACTIVE,
    });

    if (!otpData) return 'not-found';

    if (otpData.status === EOTPStatus.INACTIVE) return 'inactive';
    await this.otpRepository.update(
      {
        otpId: otpData.otpId,
      },
      {
        status: EOTPStatus.INACTIVE,
      },
    );

    if (!otpData.isValid()) return 'expired';

    return 'valid';
  }
}
