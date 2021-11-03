import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity('board_files')
export class BoardFile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board)
  board: Board;

  @Column('text')
  filename: string;

  @Column('text')
  originalName: string;

  @Column('text')
  filePath: string;
}
