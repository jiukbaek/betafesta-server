import {MigrationInterface, QueryRunner} from "typeorm";

export class addTitle1635753214844 implements MigrationInterface {
    name = 'addTitle1635753214844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" ADD "title" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "title"`);
    }

}
