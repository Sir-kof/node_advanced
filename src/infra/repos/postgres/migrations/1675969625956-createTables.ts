import { MigrationInterface, QueryRunner } from 'typeorm'

export class createTables1675969625956 implements MigrationInterface {
  name = 'createTables1675969625956'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying, "facebookId" character varying, "googleId" character varying, "twitterId" character varying, "email" character varying NOT NULL, "imageProfile" character varying, "password" character varying, "city" character varying, "state" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifier" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, "userId" integer, CONSTRAINT "UQ_9b485c95671dd0f5e3e19f9b885" UNIQUE ("identifier"), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uri" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying NOT NULL, "avaliable" character varying NOT NULL, "price" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "hourOpen" character varying NOT NULL, "hourClose" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "rating" character varying NOT NULL, "email" character varying NOT NULL, "coffeeSpace" character varying NOT NULL, "description" character varying, "imageProfile" character varying, "password" character varying, "city" character varying, "state" character varying, "whatsappLink" character varying, "facebookLink" character varying, "instagramLink" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d0af6f5866201d5cb424767744a" UNIQUE ("email"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" character varying NOT NULL, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, "userId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "favorites" ADD CONSTRAINT "FK_7a4be58abb526277d1ab266d5f1" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "images" ADD CONSTRAINT "FK_f1a190109152a55d2f47d3afd3e" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "products" ADD CONSTRAINT "FK_47942e65af8e4235d4045515f05" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "comments" ADD CONSTRAINT "FK_30165e874017eaf1be71d937f9a" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"')
    await queryRunner.query('ALTER TABLE "comments" DROP CONSTRAINT "FK_30165e874017eaf1be71d937f9a"')
    await queryRunner.query('ALTER TABLE "products" DROP CONSTRAINT "FK_47942e65af8e4235d4045515f05"')
    await queryRunner.query('ALTER TABLE "images" DROP CONSTRAINT "FK_f1a190109152a55d2f47d3afd3e"')
    await queryRunner.query('ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"')
    await queryRunner.query('ALTER TABLE "favorites" DROP CONSTRAINT "FK_7a4be58abb526277d1ab266d5f1"')
    await queryRunner.query('DROP TABLE "comments"')
    await queryRunner.query('DROP TABLE "companies"')
    await queryRunner.query('DROP TABLE "products"')
    await queryRunner.query('DROP TABLE "images"')
    await queryRunner.query('DROP TABLE "favorites"')
    await queryRunner.query('DROP TABLE "users"')
  }
}
