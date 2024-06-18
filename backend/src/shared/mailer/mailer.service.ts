/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { InternalServerErrorCustomException } from '~/common/http';
import { AllConfigType } from '~/config';
import { IMailConfig } from '~/config/mail.config';

type AttachementType = {
  filename: string;
  content: Buffer;
};

type ReceiverType = {
  to: string;
  subject: string;
  body: string;
  attachements?: AttachementType[];
};

type SenderType = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class MailerService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  async sendEMail(receiver: ReceiverType, sender?: SenderType): Promise<void> {
    const auth = {
      user: sender?.email ?? this.configService.get<IMailConfig>('mail').email,
      pass:
        sender?.password ??
        this.configService.get<IMailConfig>('mail').password,
    };

    const from = {
      name: sender?.name ?? this.configService.get<IMailConfig>('mail').name,
      address: auth.user,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth,
    });

    const { to, subject, body, attachements } = receiver;

    const mailOptions = {
      from,
      to,
      subject,
      html: body,
      attachments: attachements ?? [],
    };

    const sendMailAsync = (options: nodemailer.SendMailOptions) =>
      new Promise<void>((resolve, reject) => {
        transporter.sendMail(options, (error, info) => {
          if (error) {
            reject('Error sending email');
          } else {
            console.log('Email sent: ' + info.response);
            resolve();
          }
        });
      });

    try {
      await sendMailAsync(mailOptions);
    } catch (error: any) {
      throw new InternalServerErrorCustomException('Error sending email');
    }
  }
}
