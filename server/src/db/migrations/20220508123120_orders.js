const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await Promise.all([
    knex.schema.createTable(tableNames.orders, (table) => {
      dbUtils.addDefaultFields(table, knex);
      dbUtils.constructForeignKey({ table, tableName: tableNames.users });
      table.text('address').notNullable();
      table.string('phone', 255).notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await Promise.all([knex.schema.dropTable(tableNames.orders)]);
};
