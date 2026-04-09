import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1774937712899 implements MigrationInterface {
    name = 'Init1774937712899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "isRead" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "isRead"`);
    }

}
