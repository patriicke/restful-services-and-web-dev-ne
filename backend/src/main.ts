import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths, IAppConfig, SwaggerConfig } from './config';
import { LoggerService } from './shared/logger/logger.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import validationOptions from './common/validator/options.validator';
import * as compression from 'compression';
import * as helmet from 'helmet';
import cluster from 'cluster';
import { HttpExceptionFilter } from './common/http/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  const configService = app.get(ConfigService<ConfigKeyPaths>);
  const { apiPrefix, port } = configService.get<IAppConfig>('app');
  const allowedOrigins = ['http://localhost:3000'];

  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: allowedOrigins,
  });
  app.enableVersioning();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.setGlobalPrefix(apiPrefix);

  SwaggerConfig(app, configService);

  await app.listen(port, async () => {
    app.useLogger(app.get(LoggerService));
    const url = await app.getUrl();
    const { pid } = process;
    const env = cluster?.isPrimary;
    const prefix = env ? 'P' : 'W';
    const logger = new Logger('NestApplication');
    logger.log(`[${prefix + pid}] Server running on ${url}`);
  });

  return port;
}

bootstrap();
