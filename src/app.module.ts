import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.aliyun.com', // 替换为你的 SMTP 服务器
        port: 465, // 一般是 587 或 465
        auth: {
          user: 'wygdancer@aliyun.com', // 替换为你的邮件账户
          pass: 'XXXXXX', // 替换为你的邮件密码
        },
      },
      defaults: {
        from: '"WYG" <wygdancer@aliyun.com>', // 默认的发件人地址
      },
    }),
  ],
  providers: [AppService, EmailService, UploadService],
  controllers: [AppController, EmailController, UploadController],
})
export class AppModule {}
