const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await Promise.all([
    knex.schema.createTable(tableNames.users, (table) => {
      dbUtils.addDefaultFields(table, knex);
      table.string('email', 255).unique().notNullable();
      table.string('password', 255).notNullable();
      table.string('full_name', 200).notNullable();
      table.text('address').notNullable();
      table.string('phone', 255).notNullable();
      table.boolean('is_admin').defaultTo(false).notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await Promise.all([knex.schema.dropTable(tableNames.users)]);
};
