import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardFile } from './board-file.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => BoardFile, (boardFile) => boardFile.board)
  files: BoardFile[];

  @Column('text', { nullable: false })
  title: string;
}
