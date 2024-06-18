import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AUTH_OPTIONS, TOKEN_NAME } from '~/constants';

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const SwaggerConfig = (
  app: INestApplication,
  configService: ConfigService,
) => {
  const options = new DocumentBuilder()
    .setTitle(configService.get('app.name'))
    .setDescription(configService.get('app.description'))
    .setVersion(configService.get('app.appVersion'))
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`/swagger`, app, document);
};
