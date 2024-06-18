import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserStatus } from '../enums/user-status.enum';
import { CreateUserRequestDto } from './create-user-request.dto';

export class UpdateUserRequestDto extends PartialType(
  OmitType(CreateUserRequestDto, ['password']),
) {
  @IsOptional()
  @IsEnum(UserStatus)
  @ApiProperty({
    example: UserStatus.Active,
  })
  status: UserStatus;
}
