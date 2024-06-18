import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({
    required: true,
    example: 'password',
  })
  @IsString()
  newPassword: string;

  @ApiProperty({
    required: true,
    example: 'TOKEN',
  })
  @IsString()
  resetToken: string;
}
