import { ConfigType, registerAs } from '@nestjs/config';

export const securityRegToken = 'security';

export const SecurityConfig = registerAs(securityRegToken, () => ({
  jwtAccess: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  jwtAccessExpire: process.env.ACCESS_TOKEN_EXPIRE,
  jwtRefresh: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtRefreshExpire: process.env.REFRESH_TOKEN_EXPIRE,
  jwtCommonSecret: process.env.JWT_COMMON_SECRET_KEY,
}));

export type ISecurityConfig = ConfigType<typeof SecurityConfig>;
