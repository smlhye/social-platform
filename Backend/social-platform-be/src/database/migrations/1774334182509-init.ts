import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1774334182509 implements MigrationInterface {
    name = 'Init1774334182509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarURL" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarURL"`);
    }

}
