import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773911537502 implements MigrationInterface {
    name = 'Init1773911537502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dob" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dob" SET NOT NULL`);
    }

}
