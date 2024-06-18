import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseDto<T> {
  @ApiProperty({
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  payload: T;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  method: string;
  @ApiProperty({ example: 1617826799860 })
  timestamp: number;
}
