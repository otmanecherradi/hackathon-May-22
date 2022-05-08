
const knex = require('knex');

/**
 *
 * @param {String} tableName
 * @param {String} idField
 */
function getIdField(tableName, idField = 'id') {
  return `${tableName}.${idField}`;
}

/**
 *
 * @param {String} tableName
 * @param {String} idField
 */
function getForeignKeyField(tableName, idField = 'id') {
  return `${tableName}_${idField}`;
}

/**
 *
 * @param {import("knex").Knex.CreateTableBuilder} table
 * @param {String} idField - default to 'id'
 */
function addDefaultFields(table, idField = 'id') {
  table.uuid(idField).defaultTo(knex.raw('UUID()')).primary();
  table.timestamps(true, true);
  table.timestamp('deleted_at').nullable().defaultTo(null);
}

/**
 *
 * @param {Object} args
 * @param {import("knex").Knex.CreateTableBuilder} args.table
 * @param {String} args.tableName
 * @param {String} args.field - default to 'id'
 * @param {String} args.onDelete - default to 'CASCADE'
 * @returns {import("knex").Knex.ColumnBuilder}
 */
function constructForeignKey({
  table,
  tableName,
  field = 'id',
  onDelete = 'CASCADE',
}) {
  return table
    .uuid(getForeignKeyField(tableName))
    .references(field)
    .inTable(tableName)
    .onDelete(onDelete)
    .index();
}

/**
 *
 * @param {String} tableName
 * @param {String} toTableName
 * @param {String} field
 */
function constructRefrence(tableName, toTableName, field = 'id') {
  return `${tableName}.${toTableName}_${field}`;
}

module.exports = {
  addDefaultFields,
  constructForeignKey,
  getIdField,
  getForeignKeyField,
  constructRefrence,
};