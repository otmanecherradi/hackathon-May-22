/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const utils = require('../utils');
const constants = require('../constants');

exports.up = function (knex) {
  return knex.schema.createTable(constants.tableNames.images, function (table) {
    utils.addDefaultFields(table, knex);
    table.boolean('default').defaultTo(false);
    table.string('url', 512).notNullable();
    table.string('alt', 512).notNullable();
    utils.constructForeignKey({
      table,
      tableName: constants.tableNames.products,
    });
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await Promise.all([knex.schema.dropTable(constants.tableNames.images)]);
};
