/**
 * @class Table
 * Handles MySQL database actions for a generic table.
 */
class Table {
    /**
     * Create a Table instance.
     * @return {undefined}
     */
    constructor(log) {
        this.log = log;
    }

    /**
     * Set the database to use.
     * @param {Database} db - Instance of the Database class.
     * @return {Table} Instance of the Table class.
     */
    setDatabase(db) {
        this.db = db;
        return this;
    }

    /**
     * Set the primary key ID of the row.
     * @param {Number} id - The unique row ID.
     * @return {Table} Instance of the Table class.
     */
    setPrimaryKey(id) {
        this.primaryKey = id;
        return this;
    }
}

module.exports = Table;
