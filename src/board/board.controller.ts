import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardFile } from './board-file.entity';
import { BoardService } from './board.service';

export class BoardDTO {
  title: string;

  content: string;
}

export class EditDTO extends BoardDTO {
  deleteFiles?: Array<BoardFile>;
}

@Controller('board')
export class BoardController {
  @Inject(BoardService)
  private boardService: BoardService;

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      sFileName: file.filename,
      sFileURL: `http://localhost:3000/${file.path}`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload/files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() { boardId }: any,
  ) {
    return this.boardService.uploadBoardFiles({ boardId, files });
  }

  @UseGuards(JwtAuthGuard)
  @Post('write')
  writeBoard(@Body() writeArgs: BoardDTO) {
    return this.boardService.writeBoard(writeArgs);
  }

  @Get()
  boards() {
    return this.boardService.list();
  }

  @Get(':id')
  board(@Param('id') id: number) {
    return this.boardService.getRow(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  editPost(@Param('id') id: number, @Body() editArgs: EditDTO) {
    return this.boardService.edit(id, editArgs);
  }

  @Get('file/:id')
  async getFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.boardService.getFile(id);
    return res.download(
      join(__dirname, '../../public/', file.filename),
      file.originalName,
    );
  }
}
