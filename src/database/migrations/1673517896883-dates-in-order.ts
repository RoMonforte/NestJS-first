import {MigrationInterface, QueryRunner} from "typeorm";

export class datesInOrder1673517896883 implements MigrationInterface {
    name = 'datesInOrder1673517896883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "products" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "user" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "date" date NOT NULL`);
    }

}
