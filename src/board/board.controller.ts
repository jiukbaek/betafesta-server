import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

  @Post('upload/files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() { boardId }: any,
  ) {
    return this.boardService.uploadBoardFiles({ boardId, files });
  }

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

  @Put(':id')
  editPost(@Param('id') id: number, @Body() editArgs: EditDTO) {
    return this.boardService.edit(id, editArgs);
  }
}
