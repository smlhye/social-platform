import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775836818467 implements MigrationInterface {
    name = 'Init1775836818467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "lastSeen" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "lastSeen"`);
    }

}
