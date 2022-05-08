const { tableNames } = require('../../db/constants');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableNames.categories).del();
  await knex(tableNames.categories).insert([
    { name: 'Category 1', slug: 'category-1' },
    { name: 'Category 2', slug: 'category-2' },
    { name: 'Category 2', slug: 'category-3' },
  ]);
};
