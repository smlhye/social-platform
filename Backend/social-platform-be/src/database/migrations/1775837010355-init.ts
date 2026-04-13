import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775837010355 implements MigrationInterface {
    name = 'Init1775837010355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "lastSeen"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastSeen" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastSeen"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "lastSeen" TIMESTAMP`);
    }

}
