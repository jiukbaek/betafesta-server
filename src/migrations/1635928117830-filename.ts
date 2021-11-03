import {MigrationInterface, QueryRunner} from "typeorm";

export class filename1635928117830 implements MigrationInterface {
    name = 'filename1635928117830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_files" ADD "filename" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_files" DROP COLUMN "filename"`);
    }

}
