const env = require('./src/env');

/**
 * @type {Object.<string, import('knex').Knex.Config>}
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: env.DATABASE_NAME,
      user: env.MYSQL_USERNAME,
      password: env.MYSQL_PASSWORD,
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: env.DATABASE_NAME,
      user: env.MYSQL_USERNAME,
      password: env.MYSQL_PASSWORD,
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      database: env.DATABASE_NAME,
      user: env.MYSQL_USERNAME,
      password: env.MYSQL_PASSWORD,
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};
