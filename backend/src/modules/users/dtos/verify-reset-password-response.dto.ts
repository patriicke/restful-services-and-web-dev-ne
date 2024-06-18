import { ApiProperty } from '@nestjs/swagger';

export class VerifyResetPasswordResponseDto {
  @ApiProperty({ type: String })
  resetToken: string;
}
