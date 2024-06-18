import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthRegisterRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'username',
  })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
  })
  readonly firstName: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Doe',
  })
  readonly lastName: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'example@gmail.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
  })
  readonly password: string;
}
