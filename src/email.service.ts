import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as Velocity from 'velocityjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  private renderTemplate(templateName: string, context: object): string {
    const templatePath = path.join(
      __dirname,
      '../templates',
      `${templateName}.vm`,
    );
    console.log('templatePath-----', templatePath);
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    return Velocity.render(templateContent, context);
  }

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: object,
  ): Promise<void> {
    const html = this.renderTemplate(template, context);

    await this.mailerService.sendMail({
      to,
      subject,
      html, // 这里直接使用渲染后的 HTML
    });
  }
}
