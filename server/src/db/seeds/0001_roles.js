const { tableNames } = require('../constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableNames.roles).del();

  await knex(tableNames.roles).insert([{ name: 'admin' }, { name: 'user' }]);
};
