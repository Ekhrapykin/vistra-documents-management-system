import type { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL ?? {
      host: 'localhost',
      user: 'root',
      password: 'mysql',
      database: 'vistra_dms',
    },
    pool: { min: 1, max: 5 },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../knex_migrations',
    },
  },

  staging: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL ?? {
      host: 'localhost',
      user: 'root',
      password: 'mysql',
      database: 'vistra_dms',
    },
    pool: { min: 1, max: 5 },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../knex_migrations',
    },
  },

  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL ?? {
      host: 'localhost',
      user: 'root',
      password: 'mysql',
      database: 'vistra_dms',
    },
    pool: { min: 1, max: 5 },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../knex_migrations',
    },
  }
};

export default config;
