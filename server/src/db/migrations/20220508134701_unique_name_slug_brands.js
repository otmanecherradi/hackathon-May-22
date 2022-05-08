/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const constants = require('../constants');

exports.up = function(knex) {
    return knex.schema.alterTable(constants.tableNames.brands, function(t) {
        t.unique('name');
        t.unique('slug');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
