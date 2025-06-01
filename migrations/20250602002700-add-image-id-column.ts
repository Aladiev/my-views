import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageIdColumn1748813282853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE films
      ADD COLUMN image_id int REFERENCES images (id) NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE films
      DROP COLUMN image_id;  
    `);
  }
}

