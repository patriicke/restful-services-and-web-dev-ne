import { UserDto } from '~/modules/users/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TokenDto } from '~/modules/tokens/dto/token.dto';

export class LoginResponseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
  @ApiProperty({ type: TokenDto })
  tokens: TokenDto;
}
