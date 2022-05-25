const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.FIELDS, (table) => {
    dbUtils.addDefaultFields(table);

    table.string('name').unique().notNullable();
    table.text('description').nullable();
  });

  await knex.schema.createTable(tableNames.TRACKING_TYPES, (table) => {
    dbUtils.addDefaultFields(table);

    table.string('name').unique().notNullable();
    table.text('description').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.FIELDS);
  await knex.schema.dropTable(tableNames.TRACKING_TYPES);
};
