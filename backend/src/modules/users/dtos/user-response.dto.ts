import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserResponseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
}

export class UsersResponseDto {
  @ApiProperty({ type: [UserDto] })
  users: UserDto[];
}
