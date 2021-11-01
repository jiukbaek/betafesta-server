import { readdirSync, unlink, unlinkSync } from 'fs';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { BoardFile } from './board-file.entity';
import { BoardDTO, EditDTO } from './board.controller';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  writeBoard({ content, title }: BoardDTO) {
    const board = getRepository(Board).create({ content, title });
    console.log(board);
    return getRepository(Board).save(board);
  }

  async uploadBoardFiles({ boardId, files }) {
    const board = await getRepository(Board).findOne(boardId);
    const uploadedFiles = files.map((file: Express.Multer.File) => {
      return getRepository(BoardFile).create({
        board,
        filePath: `http://localhost:3000/${file.path}`,
        originalName: file.originalname,
      });
    });
    return getRepository(BoardFile).save(uploadedFiles);
  }

  list() {
    return getRepository(Board).find();
  }

  getRow(id: number) {
    return getRepository(Board).findOne(id, { relations: ['files'] });
  }

  async edit(id: number, { title, content, deleteFiles }: EditDTO) {
    if (deleteFiles.length) {
      deleteFiles.forEach((file) =>
        unlink(
          join(
            __dirname,
            '../../public/',
            file.filePath.split('/public/').pop(),
          ),
          () => null,
        ),
      );
      await getRepository(BoardFile).delete(
        deleteFiles.map(({ id: fileId }) => fileId),
      );
    }
    return getRepository(Board).update(id, { title, content });
  }
}
