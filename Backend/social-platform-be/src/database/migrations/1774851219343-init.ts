import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1774851219343 implements MigrationInterface {
    name = 'Init1774851219343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('message', 'friend_request', 'friend_accepted')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "senderId" character varying, "senderName" character varying, "type" "public"."notifications_type_enum" NOT NULL, "content" character varying, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "receiverId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_d1e9b2452666de3b9b4d271cca0" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_d1e9b2452666de3b9b4d271cca0"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
    }

}
