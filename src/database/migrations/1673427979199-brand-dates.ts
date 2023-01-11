import {MigrationInterface, QueryRunner} from "typeorm";

export class brandDates1673427979199 implements MigrationInterface {
    name = 'brandDates1673427979199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "updateddAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updateddAt"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "createdAt"`);
    }

}
