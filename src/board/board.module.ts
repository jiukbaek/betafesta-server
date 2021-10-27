import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './public',
    }),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
