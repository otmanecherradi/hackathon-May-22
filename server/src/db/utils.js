/**
 *
 * @param {string} tableName
 * @param {string} idField
 */
function getIdField(tableName, idField = 'id') {
  return `${tableName}.${idField}`;
}

/**
 *
 * @param {string} tableName
 * @param {string} idField
 */
function getForeignKeyField(tableName, idField = 'id') {
  return `${tableName}_${idField}`;
}

/**
 *
 * @param {import("knex").Knex.CreateTableBuilder} table
 * @param {string} idField - default to 'id'
 */
function addDefaultFields(table, idField = 'id') {
  table.bigIncrements(idField).primary();
  table.timestamps(true, true);
  table.timestamp('deleted_at').nullable().defaultTo(null);
}

/**
 *
 * @param {object} args
 * @param {import("knex").Knex.CreateTableBuilder} args.table
 * @param {string} args.tableName
 * @param {string} args.field - default to 'id'
 * @param {string} args.onDelete - default to 'CASCADE'
 */
function constructForeignKey({
  table,
  tableName,
  field = 'id',
  onDelete = 'CASCADE',
}) {
  return table
    .bigInteger(getForeignKeyField(tableName))
    .unsigned()
    .references(field)
    .inTable(tableName)
    .onDelete(onDelete)
    .index();
}

/**
 *
 * @param {string} tableName
 * @param {string} toTableName
 * @param {string} field
 */
function constructReference(tableName, toTableName, field = 'id') {
  return `${tableName}.${toTableName}_${field}`;
}

module.exports = {
  addDefaultFields,
  constructForeignKey,
  getIdField,
  getForeignKeyField,
  constructReference,
};
