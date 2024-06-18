import { ConfigType, registerAs } from '@nestjs/config';

export const mailRegToken = 'mail';

export const MailConfig = registerAs(mailRegToken, () => ({
  email: process.env.EMAIL_ADDRESS,
  password: process.env.EMAIL_PASSWORD,
  name: process.env.EMAIL_FROM_NAME,
}));

export type IMailConfig = ConfigType<typeof MailConfig>;
