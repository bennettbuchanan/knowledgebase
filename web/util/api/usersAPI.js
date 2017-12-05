import routeRequest from './routeRequest';
import getAPIURL from './getAPIURL';

const usersAPI = {
    /**
     * Get a users using their email.
     * @param {String} email - The user's email.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getUser(email, cb) {
        return routeRequest('GET', `${getAPIURL()}/users/${email}`, {}, cb);
    },

    /**
     * Get the user's ID using their email.
     * @param {String} email - The user's email.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getUserId(email, cb) {
        this.getUser(email, (err, result) => {
            if (err) {
                return cb(err);
            }
            return cb(null, result[0].id);
        });
    },

    /**
     * Get all users.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getAllUsers(cb) {
        return routeRequest('GET', `${getAPIURL()}/users`, {}, cb);
    },

    /**
     * Create a user.
     * @param {Object} query - The query object with the user information.
     * @param {Object} query.firstName - The user's first name.
     * @param {Object} query.lastName - The user's first last name.
     * @param {Object} query.email - The user's email.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    createUser(query, cb) {
        return routeRequest('POST', `${getAPIURL()}/users`, query, cb);
    },

    /**
     * Get all technologies the user is learning.
     * @param {Number} id = The primary key of the user.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    learning(id, cb) {
        return routeRequest('GET', `${getAPIURL()}/users/${id}/learn`, {}, cb);
    },

    /**
     * Get all technologies the user is sharing.
     * @param {Number} id = The primary key of the user.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    sharing(id, cb) {
        return routeRequest('GET', `${getAPIURL()}/users/${id}/share`, {}, cb);
    },
};

export default usersAPI;
