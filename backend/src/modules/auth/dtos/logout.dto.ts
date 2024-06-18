import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
