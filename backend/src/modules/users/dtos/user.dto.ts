import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../enums/user-status.enum';
import { RoleDto } from '~/modules/roles/dtos/role.dto';
import { BaseDto } from '~/common/dtos/base.dto';

export class UserDto extends BaseDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ type: [RoleDto] })
  roles?: RoleDto[];

  @ApiProperty()
  status: UserStatus;
}
