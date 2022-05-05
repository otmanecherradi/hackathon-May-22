const knex = require('knex');

const env = require('../env');
const knexConfig = require('../../knexfile');

const connectionConfig = knexConfig[env.NODE_ENV];

const connection = knex(connectionConfig);

/**
 * @type {import('knex').Knex}
 */
module.exports = connection;
