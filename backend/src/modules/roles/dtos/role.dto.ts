import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '~/common/dtos/base.dto';

export class RoleDto extends BaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  active: boolean;
}
