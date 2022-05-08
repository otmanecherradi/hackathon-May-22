const { tableNames } = require('../../db/constants');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableNames.brands.TABLE).del();
  await knex(tableNames.brands.TABLE).insert([
    { name: 'Brand 1', slug: 'brand-1' },
    { name: 'Brand 2', slug: 'brand-2' },
    { name: 'Brand 2', slug: 'brand-3' },
  ]);
};
