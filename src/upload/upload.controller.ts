import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

// 导入 Multer 文件类型
import { Express } from 'express';

const storage = diskStorage({
  destination: './templates', // 文件保存路径
  filename: (req, file, callback) => {
    // 自定义保存文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname); // 获取文件扩展名
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
    callback(null, filename);
  },
});

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file); // 打印文件信息
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
    };
  }

  @Post('richText')
  uploadContent(@Body() body: { content: string }) {
    const { content } = body;

    // 定义要保存文件的路径
    const filePath = path.join(
      __dirname,
      '../../',
      'templates',
      `content-${Date.now()}.vm`,
    );
    // 保存富文本内容到文件
    fs.writeFileSync(filePath, content, 'utf8');

    return {
      message: 'Content uploaded and saved successfully',
      filePath,
    };
  }
}
