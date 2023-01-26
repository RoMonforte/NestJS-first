import {MigrationInterface, QueryRunner} from "typeorm";

export class imageUser1674729364423 implements MigrationInterface {
    name = 'imageUser1674729364423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    }

}
