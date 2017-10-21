/**
 * @class Database
 * Handles MySQL generic database actions.
 */
class Database {
    /**
     * Set the MySQL database connection.
     * @param {Object} connection - The MySQL connection to run queries with.
     */
    setConnection(connection) {
        this.connection = connection;
        return this;
    }

    /**
     * End the MySQL database connection.
     * @param {Database} - Instance of the Database class.
     */
    endConnection() {
        this.connection.end();
        return this;
    }

    /**
     * Set the name of the database to use.
     * @param {String} name - The name of the database to use.
     * @param {Database} - Instance of the Database class.
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * Get the name of the database to use.
     * @return {String} The name of the database in use.
     */
    getName() {
        return this.name;
    }

    /**
     * Runs the given SQL query.
     * @param {String} query - The SQL query to run.
     * @param {Object} log - Instance of logger.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    query(query, log, cb) {
        log.debug('running MySQL query', {
            method: 'Database::query',
        });
        return this.connection.query(query, cb);
    }
}

module.exports = Database;
