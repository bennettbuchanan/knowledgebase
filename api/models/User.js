const Table = require('./Table');

/**
 * @class User
 * Handles MySQL database actions for the user table.
 */
class User extends Table {
    /**
     * Set the first name of the user.
     * @param {String} firstName - The first name of the user.
     * @return {User} Instance of the User class.
     */
    setFirstName(firstName) {
        this.firstName = firstName;
        return this;
    }

    /**
     * Set the last name of the user.
     * @param {String} lastname - The last name of the user.
     * @return {User} Instance of the User class.
     */
    setLastName(lastName) {
        this.lastName = lastName;
        return this;
    }

    /**
     * Set the email of the user.
     * @param {String} email - The email of the user.
     * @return {User} Instance of the User class.
     */

    setEmail(email) {
        this.email = email;
        return this;
    }

    /**
     * Insert a user in the user table.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    create(cb) {
        this.log.debug('inserting user in database', {
            method: 'User::create',
        });
        const query =
            `INSERT INTO user (first_name,
                               last_name,
                               email)
            VALUES            ('${this.firstName}',
                               '${this.lastName}',
                               '${this.email}');`;
        return this.db.query(query, this.log, cb);
    }

    /**
     * Delete a user from the user table.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    delete(cb) {
        this.log.debug('deleting user in database', {
            method: 'User::delete',
        });
        const query = `DELETE FROM user WHERE id=${this.primaryKey};`;
        return this.db.query(query, this.log, cb);
    }

    /**
     * Retrieve all users.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    all(cb) {
        this.log.debug('inserting user in database', {
            method: 'User::getAll',
        });
        const query = 'SELECT * FROM user;';
        return this.db.query(query, this.log, cb);
    }

    /**
     * Retrieve technologies a user is learning.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    learn(cb) {
        this.log.debug('getting all technologies in database', {
            method: 'User::learn',
        });
        const query =
            `SELECT name FROM tech
            WHERE id IN (SELECT tech_id
                         FROM learn
                         WHERE user_id = ${this.primaryKey});`;
        return this.db.query(query, this.log, cb);
    }

    /**
     * Retrieve technologies a user is sharing.
     * @param {Function} cb - Callback function.
     * @return {undefined}
     */
    share(cb) {
        this.log.debug('getting all technologies in database', {
            method: 'User::shares',
        });
        const query =
            `SELECT name FROM tech
            WHERE id IN (SELECT tech_id
                         FROM share
                         WHERE user_id = ${this.primaryKey});`;
        return this.db.query(query, this.log, cb);
    }
}

module.exports = User;
