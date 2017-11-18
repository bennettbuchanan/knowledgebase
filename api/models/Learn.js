const Table = require('../models/Table');

/**
 * @class Learn
 * Handles MySQL database actions for the learn table.
 */
class Learn extends Table {
    /**
     * Set the ID of the user that wants to learn a technology.
     * @param {Number} id - The user ID.
     * @return {Learn} Instance of the Learn class.
     */
    setUserId(id) {
        this.userId = id;
        return this;
    }

    /**
     * Set the ID of the technology that the user wants to learn.
     * @param {Number} id - The technology ID.
     * @return {Learn} Instance of the Learn class.
     */
    setTechId(id) {
        this.techId = id;
        return this;
    }

    /**
     * Insert an entry in the learn table.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    create(cb) {
        this.log.debug('inserting learn entry in database', {
            method: 'Learn::create',
        });
        const query =
            `INSERT INTO learn (user_id,
                                tech_id)
            VALUES             (${this.userId},
                                ${this.techId});`;
        return this.db.query(query, this.log, cb);
    }

    /**
     * Delete an entry from the learn table.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    delete(cb) {
        this.log.debug('deleting tech in database', {
            method: 'Learn::delete',
        });
        const query = `DELETE FROM learn WHERE id=${this.primaryKey};`;
        return this.db.query(query, this.log, cb);
    }

    getAllUsers(cb) {
        this.log.debug('getting all users learning a tech in database', {
            method: 'Learn::getAllUsers',
        });
        const query =
            `SELECT id, first_name, last_name, image, email FROM user
            WHERE id IN (SELECT user_id
                         FROM learn
                         WHERE tech_id = ${this.techId});`;
        return this.db.query(query, this.log, cb);
    }
}

module.exports = Learn;
