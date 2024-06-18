import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class VerifyPasswordResetOtpDTO {
  @ApiProperty({
    required: true,
    example: 123456,
  })
  @IsNumber()
  otp: number;

  @ApiProperty({
    required: true,
    example: 'example@gmail.com',
  })
  @IsString()
  email: string;
}
