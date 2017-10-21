const Table = require('../models/Table');

/**
 * @class Share
 * Handles MySQL database actions for the share table.
 */
class Share extends Table {
    /**
     * Set the ID of the user that wants to share a technology.
     * @param {Number} id - The user ID.
     * @return {Share} Instance of the Share class.
     */
    setUserId(id) {
        this.userId = id;
        return this;
    }

    /**
     * Set the ID of the technology that the user wants to share.
     * @param {Number} id - The technology ID.
     * @return {Share} Instance of the Share class.
     */
    setTechId(id) {
        this.techId = id;
        return this;
    }

    /**
     * Insert an entry in the share table.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    create(cb) {
        this.log.debug('inserting share entry in database', {
            method: 'Share::create',
        });
        const query =
            `INSERT INTO share (user_id,
                                tech_id)
            VALUES             (${this.userId},
                                ${this.techId});`;
        return this.db.query(query, this.log, cb);
    }

    /**
     * Delete an entry from the share table.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    delete(cb) {
        this.log.debug('deleting tech in database', {
            method: 'Share::delete',
        });
        const query = `DELETE FROM share WHERE id=${this.primaryKey};`;
        return this.db.query(query, this.log, cb);
    }
}

module.exports = Share;