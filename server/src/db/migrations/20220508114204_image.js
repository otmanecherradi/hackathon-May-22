/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const utils = require('../utils');
const constants = require('../constants');


exports.up = function(knex) {
    return knex.schema.createTable(constants.tableNames.images, function(table){
        utils.addDefaultFields(table);
        table.boolean('default').defaultTo(false);
        table.string('url', 512).notNullable();
        table.string('alt', 512).notNullable();
        utils.constructForeignKey(table, utils.tableNames.products);
      })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
