import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class RemoveRolesFromUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  roles: string[];
}
