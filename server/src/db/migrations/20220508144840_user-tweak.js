const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await Promise.all([
    knex.schema.alterTable(tableNames.users, (table) => {
      table.text('address').nullable().alter();
      table.string('phone', 255).nullable().alter();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await Promise.all([
    knex.schema.alterTable(tableNames.users, (table) => {
      table.text('address').notNullable().alter();
      table.string('phone', 255).notNullable().alter();
    }),
  ]);
};
