import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
