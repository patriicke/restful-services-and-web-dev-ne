import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
  })
  currentPassword: string;

  @IsNotEmpty()
  @Length(6, 20)
  @ApiProperty({
    example: 'password',
  })
  newPassword: string;
}
