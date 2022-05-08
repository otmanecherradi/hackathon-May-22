/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const utils = require('../utils');
const constants = require('../constants');

exports.up = function (knex) {
  return knex.schema.createTable(
    constants.tableNames.products,
    function (table) {
      utils.addDefaultFields(table, knex);
      table.string('name', 255).notNullable();
      table.string('slug', 512).notNullable();
      table.decimal('price').notNullable();
      table.decimal('price_old');
      table.string('description', 512).notNullable();
      utils.constructForeignKey({
        table,
        tableName: constants.tableNames.brands,
      });
      utils.constructForeignKey({
        table,
        tableName: constants.tableNames.categories,
      });
    },
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await Promise.all([knex.schema.dropTable(constants.tableNames.products)]);
};
