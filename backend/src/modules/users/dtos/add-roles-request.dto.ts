import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, IsNotEmpty } from 'class-validator';

export class AddRolesToUserRequestDto {
  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  roles: string[];
}
