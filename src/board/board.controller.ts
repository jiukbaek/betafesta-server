import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('board')
@UseInterceptors(FileInterceptor('file'))
export class BoardController {
  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      sFileName: file.filename,
      sFileURL: `http://localhost:3000/${file.path}`,
    };
  }
}
