import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { MailerModule } from './mailer/mailer.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    MailerModule.forRoot(),
    ResponseModule.forRoot(),
  ],
})
export class SharedModule {}
