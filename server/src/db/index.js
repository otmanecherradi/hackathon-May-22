const knex = require('knex');

const env = require('../env');
const knexConfig = require('../../knexfile');

const connectionConfig = knexConfig[env.NODE_ENV];

/**
 * @type {import('knex').Knex}
 */
const connection = knex(connectionConfig);

module.exports = connection;
