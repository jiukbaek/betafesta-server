import { readdirSync, unlink, unlinkSync } from 'fs';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { BoardFile } from './board-file.entity';
import { BoardDTO, EditDTO } from './board.controller';
import { Board } from './board.entity';

console.log(process.env);

@Injectable()
export class BoardService {
  writeBoard({ content, title }: BoardDTO) {
    const board = getRepository(Board).create({ content, title });
    return getRepository(Board).save(board);
  }

  async delete(id) {
    const board = await getRepository(Board).findOne(id);
    const deleteFiles = await getRepository(BoardFile).find({ board });
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
    return getRepository(Board).delete({ id });
  }

  async uploadBoardFiles({ boardId, files }) {
    const board = await getRepository(Board).findOne(boardId);
    const uploadedFiles = files.map((file: Express.Multer.File) => {
      return getRepository(BoardFile).create({
        board,
        filename: file.filename,
        filePath: `${process.env.HOST}/${file.path}`,
        originalName: file.originalname,
      });
    });
    return getRepository(BoardFile).save(uploadedFiles);
  }

  list() {
    return getRepository(Board).find({ order: { id: 'DESC' } });
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

  async getFile(id: number): Promise<BoardFile> {
    const file = await getRepository(BoardFile).findOne(id);

    return file;
  }
}
