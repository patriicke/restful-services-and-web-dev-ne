import { ConfigType, registerAs } from '@nestjs/config';

export const appRegToken = 'app';

export const AppConfig = registerAs(appRegToken, () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  workingDirectory: process.env.PWD,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  appVersion: process.env.APP_VERSION || '1.0.0',
}));

export type IAppConfig = ConfigType<typeof AppConfig>;
