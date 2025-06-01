import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImageTable1745786378090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE images (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        data BYTEA NOT NULL,
        mimetype VARCHAR(255) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE images;`);
  }
}

