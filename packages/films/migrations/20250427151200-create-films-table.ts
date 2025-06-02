import { MigrationInterface, QueryRunner } from 'typeorm';

export class initFilmsTableMigration1745756378090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "images" (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          data BYTEA NOT NULL,
          mimetype VARCHAR(255) NOT NULL
        );

        CREATE TABLE "films"
        (
          id                     serial                             primary key,
          title                  text                               not null,
          year                   smallint                           not null,
          duration               int                                not null,
          description            text default ''                    not null,
          image_id               int REFERENCES images (id)         not null,
          created_at             timestamp default now()            not null,
          updated_at             timestamp default now()            not null
        );
      `,
    );

    await queryRunner.query(
      `CREATE INDEX "films__title__index" ON "films"("title")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "films"`);
    await queryRunner.query(`DROP TABLE "images";`);
  }
}
