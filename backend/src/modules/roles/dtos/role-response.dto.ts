import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

export class RoleResponseDto {
  @ApiProperty({ type: RoleDto })
  role: RoleDto;
}

export class RolesResponseDto {
  @ApiProperty({ type: [RoleDto] })
  roles: RoleDto[];
}
