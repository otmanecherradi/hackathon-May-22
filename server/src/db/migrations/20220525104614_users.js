const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.ROLES, (table) => {
    dbUtils.addDefaultFields(table);

    table.string('name').unique().notNullable();
    table.text('description').nullable();
  });

  await knex.schema.createTable(tableNames.USERS, (table) => {
    dbUtils.addDefaultFields(table);

    table.string('full_name').nullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    table.boolean('is_active').defaultTo(false);

    dbUtils
      .constructForeignKey({ table, tableName: tableNames.ROLES })
      .notNullable();

    dbUtils
      .constructForeignKey({ table, tableName: tableNames.COMPANIES })
      .notNullable();
  });

  await knex.schema.createTable(tableNames.USER_LOCATIONS, (table) => {
    dbUtils.addDefaultFields(table);

    dbUtils.constructForeignKey({ table, tableName: tableNames.LOCATIONS });
    dbUtils.constructForeignKey({ table, tableName: tableNames.USERS });

    table.string('type').notNullable();
    table.text('description').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.USER_LOCATIONS);

  await knex.schema.dropTable(tableNames.USERS);
  await knex.schema.dropTable(tableNames.ROLES);
};
