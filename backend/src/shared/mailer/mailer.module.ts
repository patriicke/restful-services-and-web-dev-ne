import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({})
export class MailerModule {
  static forRoot() {
    return {
      global: true,
      module: MailerModule,
      providers: [MailerService],
      exports: [MailerService],
    };
  }
}
