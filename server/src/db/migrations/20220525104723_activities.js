const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.ACTIVITIES, (table) => {
    dbUtils.addDefaultFields(table);

    dbUtils
      .constructForeignKey({ table, tableName: tableNames.COMPANIES })
      .notNullable();

    table.string('file_url_bucket').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.ACTIVITIES);
};
