const getConnection = require('../util/getConnection');

/**
 * @class Database
 * Handles MySQL generic database actions.
 */
class Database {
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
        this.connection = getConnection();
        this.connection.on('error', err =>
            log.error('MySQL connection error has occurred', { error: err }));
        // Every method on a connection is queued and executed in sequence.
        this.connection.connect();
        this.connection.query(query, cb);
        this.connection.end();
    }
}

module.exports = Database;
