import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const options: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://postgres:postgres@localhost:5439/postgres' as string,
  migrations: ['dist_migrations/*.js'],
  entities: ['dist/modules/**/*.entity.ts'],
  ssl: false,
};

export const connectionSource = new DataSource(options);
