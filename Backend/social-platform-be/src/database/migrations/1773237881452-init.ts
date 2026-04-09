import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773237881452 implements MigrationInterface {
    name = 'Init1773237881452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."friendships_status_enum" AS ENUM('pending', 'accepted', 'blocked')`);
        await queryRunner.query(`CREATE TABLE "friendships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."friendships_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "requester_id" uuid, "addressee_id" uuid, CONSTRAINT "PK_08af97d0be72942681757f07bc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_4cf3c68ed4a5a9fde8d4c2b7319" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_01b0760fd2402d21f12c6dc5f89" FOREIGN KEY ("addressee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_01b0760fd2402d21f12c6dc5f89"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_4cf3c68ed4a5a9fde8d4c2b7319"`);
        await queryRunner.query(`DROP TABLE "friendships"`);
        await queryRunner.query(`DROP TYPE "public"."friendships_status_enum"`);
    }

}
