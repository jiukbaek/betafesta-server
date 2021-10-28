import {MigrationInterface, QueryRunner} from "typeorm";

export class first1635433049935 implements MigrationInterface {
    name = 'first1635433049935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boards" ("id" SERIAL NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_files" ("id" SERIAL NOT NULL, "originalName" text NOT NULL, "filePath" text NOT NULL, "boardId" integer, CONSTRAINT "PK_547917c9f722123d411591ca304" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "board_files" ADD CONSTRAINT "FK_3afa15f2408f9f971bdfeef7684" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_files" DROP CONSTRAINT "FK_3afa15f2408f9f971bdfeef7684"`);
        await queryRunner.query(`DROP TABLE "board_files"`);
        await queryRunner.query(`DROP TABLE "boards"`);
    }

}
