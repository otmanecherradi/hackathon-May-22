const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await Promise.all([
    knex.schema.createTable(tableNames.orderDetails, (table) => {
      dbUtils.addDefaultFields(table, knex);
      dbUtils.constructForeignKey({ table, tableName: tableNames.orders });
      dbUtils.constructForeignKey({ table, tableName: tableNames.products });
      table.double('price').notNullable();
      table.integer('qty').notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await Promise.all([knex.schema.dropTable(tableNames.orderDetails)]);
};
