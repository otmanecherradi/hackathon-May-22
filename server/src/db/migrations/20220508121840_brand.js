/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const utils = require('../utils');
const constants = require('../constants');


exports.up = function(knex) {
    return knex.schema.createTable(constants.tableNames.brands, function(table){
        utils.addDefaultFields(table);
        table.string('name', 255).notNullable();
        table.string('slug', 512).notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
