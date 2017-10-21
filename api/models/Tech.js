const Table = require('../models/Table');

/**
 * @class Tech
 * Handles MySQL database actions for the tech table.
 */
class Tech extends Table {
    /**
     * Set the name of the technology;
     * @param {String} name - The name of the technology.
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * Insert a tech entry in the table.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    create(cb) {
        this.log.debug('inserting tech in database', {
            method: 'Tech::create',
        });
        const query = `INSERT INTO tech (name) VALUES ('${this.name}');`;
        return this.db.query(query, this.log, cb);
    }

    /**
     * Delete a tech entry from the table.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    delete(cb) {
        this.log.debug('deleting tech in database', {
            method: 'Tech::delete',
        });
        const query = `DELETE FROM tech WHERE id=${this.primaryKey};`;
        return this.db.query(query, this.log, cb);
    }

    /**
     * Retrieve all technologies.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    all(cb) {
        this.log.debug('getting all technologies from database', {
            method: 'Tech::all',
        });
        const query = 'SELECT * FROM tech;';
        return this.db.query(query, this.log, cb);
    }

    /**
     * Retrieve all users learning this technology.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    usersLearning(cb) {
        this.log.debug('getting all users learning a technology', {
            method: 'Tech::usersLearning',
        });
        const query =
            `SELECT name FROM tech
            WHERE id IN (SELECT user_id
                         FROM learn
                         WHERE tech_id = ${this.primaryKey});`;
        return this.db.query(query, this.log, cb);
    }
}

module.exports = Tech;
