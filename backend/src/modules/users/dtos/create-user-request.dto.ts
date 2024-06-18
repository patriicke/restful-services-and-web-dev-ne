import {
  ArrayNotEmpty,
  IsAlphanumeric,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({
    example: 'username',
  })
  username: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({
    example: 'username',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    example: 'John',
  })
  firstName: string;

  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @IsNotEmpty()
  @Length(6, 20)
  @ApiProperty({
    example: 'password',
  })
  password: string;

  @ApiProperty({ example: ['d931c711-0c8a-4713-8a63-b1717012594f'] })
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  roles: string[];
}
