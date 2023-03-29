import type { Transporter } from 'nodemailer';
import { createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import type { ConfigService } from '~/core/providers';

import type { MailData } from './mail.interface';
export class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly configService: ConfigService) {
    this.createMailerOptions();
  }

  private createMailerOptions() {
    this.transporter = createTransport({
      service: 'gmail', // will be update depending on current service
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      ignoreTLS: this.configService.get<boolean>('MAIL_IGNORE_TLS'),
      secure: this.configService.get<boolean>('MAIL_SECURE'),
      requireTLS: this.configService.get<boolean>('MAIL_REQUIRE_TLS'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
      from: `${this.configService.get<string>(
        'MAIL_DEFAULT_NAME',
      )} <${this.configService.get<string>('MAIL_DEFAULT_EMAIL')}>`,
    });
  }

  async sendEmployeeInvitation(mailData: MailData<{ websiteUrl: string }>) {
    await this.transporter.sendMail({
      to: mailData.to,
      subject: `Invitation`,
      html: 'invitation',
      //// need up update when implementation
    });
  }
}