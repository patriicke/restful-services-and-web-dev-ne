import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const IS_PUBLIC = 'isPublic';
export const ROLES = 'roles';
export const TOKEN_NAME = 'access-token';

export const AUTH_OPTIONS: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};
