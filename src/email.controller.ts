import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('send')
  async sendTestEmail(): Promise<void> {
    await this.emailService.sendEmail(
      'lcecola@126.com', // 收件人
      'Welcome to Our Platform', // 主题
      'welcome', // 模板名称
      { username: 'John Doe', url: 'https://example.com/activate' }, // 上下文
    );
  }
}
