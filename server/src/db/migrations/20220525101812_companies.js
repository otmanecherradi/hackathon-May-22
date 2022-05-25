const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.LOCATIONS, (table) => {
    dbUtils.addDefaultFields(table);

    table.string('name').unique().notNullable();
    table.text('description').nullable();

    table.string('address').notNullable();

    table.decimal('lat', 20, 10).notNullable();
    table.decimal('lng', 20, 10).notNullable();
  });

  await knex.schema.createTable(tableNames.COMPANIES, (table) => {
    dbUtils.addDefaultFields(table);

    table.string('ice').notNullable();
    table.string('name').notNullable();

    table.string('legal_status').notNullable();

    dbUtils.constructForeignKey({ table, tableName: tableNames.FIELDS });
  });

  await knex.schema.createTable(tableNames.COMPANY_LOCATIONS, (table) => {
    dbUtils.addDefaultFields(table);

    dbUtils.constructForeignKey({ table, tableName: tableNames.LOCATIONS });
    dbUtils.constructForeignKey({ table, tableName: tableNames.COMPANIES });

    table.string('type').notNullable();
    table.text('description').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.COMPANY_LOCATIONS);

  await knex.schema.dropTable(tableNames.LOCATIONS);
  await knex.schema.dropTable(tableNames.COMPANIES);
};
