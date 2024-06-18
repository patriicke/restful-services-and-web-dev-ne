import { TokenType } from '~/modules/tokens/enums';

export interface JwtPayload {
  sub: string;
  tid: string;
  type: TokenType;
}
