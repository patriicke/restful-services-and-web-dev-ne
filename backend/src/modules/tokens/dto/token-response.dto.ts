import { ApiProperty } from '@nestjs/swagger';
import { TokenDto } from './token.dto';

export class TokenResponseDto {
  @ApiProperty({ type: TokenDto })
  tokens: TokenDto;
}
