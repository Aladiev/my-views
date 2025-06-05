import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const options: DataSourceOptions = {
  type: 'postgres',
  url: process.env.PG_CONNECTION_STRING as string,
  migrations: ['dist_migrations/*.js'],
  entities: ['dist/modules/**/*.entity.ts'],
  ssl: false,
};

export const connectionSource = new DataSource(options);
