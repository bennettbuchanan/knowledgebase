import request from 'superagent';
import getAPIURL from './getAPIURL';
import safeJSONParse from './safeJSONParse';

/**
 * Make a request to the api with the given parameters.
 * @param {String} method - The HTTP method to use for the request.
 * @param {String} path - The API route path.
 * @param {Function} cd - The callback function.
 * @return {undefined}
 */
function routeRequest(method, path, cb) {
    request(method, `${getAPIURL()}${path}`)
        .end((err, res) => {
            if (err) {
                return cb(err);
            }
            const { parseErr, data } = safeJSONParse(res.text);
            if (parseErr) {
                return cb(parseErr);
            }
            return cb(null, data);
        });
}

const usersAPI = {
    /**
     * Get all users.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getAllUsers(cb) {
        return routeRequest('GET', '/users', cb);
    },

    /**
     * Get all technologies the user is learning.
     * @param {Number} id = The primary key of the user.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    learning(id, cb) {
        return routeRequest('GET', `/users/${id}/learn`, cb);
    },

    /**
     * Get all technologies the user is sharing.
     * @param {Number} id = The primary key of the user.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    sharing(id, cb) {
        return routeRequest('GET', `/users/${id}/share`, cb);
    },
};

export default usersAPI;
