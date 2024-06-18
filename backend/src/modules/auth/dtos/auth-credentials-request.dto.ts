import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthCredentialsRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'username',
  })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
  })
  readonly password: string;
}
