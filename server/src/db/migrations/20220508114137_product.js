/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const utils = require('../utils');

exports.up = function(knex) {
  return knex.schema.createTable('products', function(table){
    utils.addDefaultFields(table);
    table.string('name', 255).notNullable();
    table.string('slug', 512).notNullable();
    table.decimal('price').notNullable();
    table.decimal('price_old');
    table.string('description', 512).notNullable();
    utils.constructForeignKey(table, 'brands');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
