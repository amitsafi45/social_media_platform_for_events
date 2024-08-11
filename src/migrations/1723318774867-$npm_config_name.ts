import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1723318774867 implements MigrationInterface {
  name = ' $npmConfigName1723318774867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying(200) NOT NULL, "event_id" uuid NOT NULL, "commentator_id" uuid NOT NULL, CONSTRAINT "PK_09bced71952353c5ae4e40f0f52" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "event_id" uuid, CONSTRAINT "UQ_7a5345cfc059eec1d008af9209d" UNIQUE ("user_id", "event_id"), CONSTRAINT "PK_b330af738335d4e2108c7047d55" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "path" character varying(200) NOT NULL, "user_id" uuid, CONSTRAINT "UQ_62dc4afe322f162525c62d3e76d" UNIQUE ("user_id"), CONSTRAINT "REL_62dc4afe322f162525c62d3e76" UNIQUE ("user_id"), CONSTRAINT "PK_cf821114211f58502289919f665" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "follow_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "following_id" uuid NOT NULL, "follower_id" uuid NOT NULL, CONSTRAINT "UQ_41422dbeee9353be364a348986b" UNIQUE ("following_id", "follower_id"), CONSTRAINT "PK_d3b514cd26ff6190a8f836f9b28" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content_id" character varying(200) NOT NULL, "title" character varying(100) NOT NULL, "content" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "sender_id" uuid NOT NULL, "receiver_id" uuid NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "path" character varying(200) NOT NULL, "event_id" uuid, CONSTRAINT "PK_4e5f0c8c1718c8c2026c15296af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."event_category_enum" AS ENUM('Music', 'Sports', 'Tech', 'None')`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "date" date, "time" TIME, "location" character varying(200), "category" "public"."event_category_enum" NOT NULL DEFAULT 'None', "creator_id" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_comment" ADD CONSTRAINT "FK_8da08016d17d952b57fce7c4ec3" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_comment" ADD CONSTRAINT "FK_4615074d06f2bd54d2a82ed46e2" FOREIGN KEY ("commentator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_like" ADD CONSTRAINT "FK_86f4aa4e605bf334d2aaa9c503a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_like" ADD CONSTRAINT "FK_1676cf3abe123e0fe02586e6b6d" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_media" ADD CONSTRAINT "FK_62dc4afe322f162525c62d3e76d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow_user" ADD CONSTRAINT "FK_ea20efcf79a5e540464eaffe4d6" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow_user" ADD CONSTRAINT "FK_054fb00b2541321f9daa8750f1b" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_56023c91b76b36125acd4dcd9c5" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_90543bacf107cdd564e9b62cd20" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_media" ADD CONSTRAINT "FK_16a84aef47c794ac3d01f39830c" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_25cfbefb1f85a771e03c6cbf105" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_25cfbefb1f85a771e03c6cbf105"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_media" DROP CONSTRAINT "FK_16a84aef47c794ac3d01f39830c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_90543bacf107cdd564e9b62cd20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_56023c91b76b36125acd4dcd9c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow_user" DROP CONSTRAINT "FK_054fb00b2541321f9daa8750f1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow_user" DROP CONSTRAINT "FK_ea20efcf79a5e540464eaffe4d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_media" DROP CONSTRAINT "FK_62dc4afe322f162525c62d3e76d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_like" DROP CONSTRAINT "FK_1676cf3abe123e0fe02586e6b6d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_like" DROP CONSTRAINT "FK_86f4aa4e605bf334d2aaa9c503a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_comment" DROP CONSTRAINT "FK_4615074d06f2bd54d2a82ed46e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_comment" DROP CONSTRAINT "FK_8da08016d17d952b57fce7c4ec3"`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TYPE "public"."event_category_enum"`);
    await queryRunner.query(`DROP TABLE "event_media"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "follow_user"`);
    await queryRunner.query(`DROP TABLE "profile_media"`);
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "event_like"`);
    await queryRunner.query(`DROP TABLE "user_comment"`);
  }
}
