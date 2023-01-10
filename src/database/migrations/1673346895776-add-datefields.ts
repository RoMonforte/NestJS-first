import {MigrationInterface, QueryRunner} from "typeorm";

export class addDatefields1673346895776 implements MigrationInterface {
    name = 'addDatefields1673346895776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updateddAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateddAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createdAt"`);
    }

}
