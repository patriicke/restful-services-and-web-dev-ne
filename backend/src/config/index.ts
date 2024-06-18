import { AppConfig, IAppConfig, appRegToken } from './app.config';
import { IMailConfig, MailConfig, mailRegToken } from './mail.config';
import {
  SecurityConfig,
  ISecurityConfig,
  securityRegToken,
} from './security.config';
import {
  TypeOrmConfig,
  ITypeOrmConfig,
  typeOrmRegToken,
} from './typeorm.config';

export * from './app.config';
export * from './swagger.config';
export * from './security.config';

export interface AllConfigType {
  [appRegToken]: IAppConfig;
  [typeOrmRegToken]: ITypeOrmConfig;
  [securityRegToken]: ISecurityConfig;
  [mailRegToken]: IMailConfig;
}

export type ConfigKeyPaths = Record<NestedKeyOf<AllConfigType>, any>;

export default {
  AppConfig,
  TypeOrmConfig,
  SecurityConfig,
  MailConfig,
};
