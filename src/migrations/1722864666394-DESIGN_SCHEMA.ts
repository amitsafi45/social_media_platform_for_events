import { MigrationInterface, QueryRunner } from 'typeorm';

export class DESIGNSCHEMA1722864666394 implements MigrationInterface {
  name = 'DESIGNSCHEMA1722864666394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying(200) NOT NULL, "event_id" uuid, "commentator_id" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "event_id" uuid, CONSTRAINT "UQ_3dd8a9b5afafb766340fa9d86c4" UNIQUE ("user_id", "event_id"), CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "path" character varying NOT NULL, "event_id" uuid, CONSTRAINT "PK_4e5f0c8c1718c8c2026c15296af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."event_category_enum" AS ENUM('Music', 'Sports', 'Tech')`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "date" date, "time" TIME, "location" character varying(200), "category" "public"."event_category_enum", "creator_id" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "path" character varying NOT NULL, "user_id" uuid, CONSTRAINT "UQ_62dc4afe322f162525c62d3e76d" UNIQUE ("user_id"), CONSTRAINT "REL_62dc4afe322f162525c62d3e76" UNIQUE ("user_id"), CONSTRAINT "PK_cf821114211f58502289919f665" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "follow_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "followed_by_id" uuid NOT NULL, CONSTRAINT "UQ_81b12fc2ed60a078f91e1ef0962" UNIQUE ("user_id", "followed_by_id"), CONSTRAINT "PK_d3b514cd26ff6190a8f836f9b28" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_d7f6805a4365989dedc7b9d9568" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_a41125353b8530ffc2e28ccbd74" FOREIGN KEY ("commentator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_4356ac2f9519c7404a2869f1691" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_dc844fa320ff5b5595d90fa37eb" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_media" ADD CONSTRAINT "FK_16a84aef47c794ac3d01f39830c" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_25cfbefb1f85a771e03c6cbf105" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_media" ADD CONSTRAINT "FK_62dc4afe322f162525c62d3e76d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow_user" ADD CONSTRAINT "FK_50c04f1c832e050571cfb9b6150" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow_user" ADD CONSTRAINT "FK_787b4e7b17563db356d3035e453" FOREIGN KEY ("followed_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "follow_user" DROP CONSTRAINT "FK_787b4e7b17563db356d3035e453"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow_user" DROP CONSTRAINT "FK_50c04f1c832e050571cfb9b6150"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_media" DROP CONSTRAINT "FK_62dc4afe322f162525c62d3e76d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_25cfbefb1f85a771e03c6cbf105"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_media" DROP CONSTRAINT "FK_16a84aef47c794ac3d01f39830c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_dc844fa320ff5b5595d90fa37eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_4356ac2f9519c7404a2869f1691"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_a41125353b8530ffc2e28ccbd74"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_d7f6805a4365989dedc7b9d9568"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "follow_user"`);
    await queryRunner.query(`DROP TABLE "profile_media"`);
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TYPE "public"."event_category_enum"`);
    await queryRunner.query(`DROP TABLE "event_media"`);
    await queryRunner.query(`DROP TABLE "like"`);
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
