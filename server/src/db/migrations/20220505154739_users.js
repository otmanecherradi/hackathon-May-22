const { tableNames } = require('../constants');

const dbUtils = require('../utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.roles, (table) => {
    dbUtils.addDefaultFields(table);

    table.string('name').unique().notNullable();
    table.text('description').nullable();
  });

  await knex.schema.createTable(tableNames.users, (table) => {
    dbUtils.addDefaultFields(table);

    table.string('full_name').nullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    dbUtils
      .constructForeignKey({
        table,
        tableName: tableNames.roles,
        len: 1,
      })
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.users);
  await knex.schema.dropTable(tableNames.roles);
};
