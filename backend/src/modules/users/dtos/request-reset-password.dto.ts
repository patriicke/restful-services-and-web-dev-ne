import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestResetPasswordDTO {
  @ApiProperty({
    required: true,
    example: 'example@gmail.com',
  })
  @IsString()
  email: string;
}
