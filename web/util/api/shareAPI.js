import routeRequest from './routeRequest';
import getAPIURL from './getAPIURL';

const shareAPI = {
    /**
     * Add a new technology the user wants to share.
     * @param {Object} query - The query object with the technology information.
     * @param {Object} query.userId - The id of the user.
     * @param {Object} query.techId - The id of the technology.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    add(query, cb) {
        return routeRequest('POST', `${getAPIURL()}/share`, query, cb);
    },

    /**
     * Deletes a technology the user wanted to share.
     * @param {Number} id - The id of the share entry.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    delete(id, cb) {
        return routeRequest('DELETE', `${getAPIURL()}/share/${id}`, {}, cb);
    },

    /**
     * Get the ID of a share entry.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getId(query, cb) {
        return routeRequest('GET', `${getAPIURL()}/share`, query, cb);
    },

    /**
     * List all the users that want to share a technology.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getAllUsers(id, cb) {
        return routeRequest('GET', `${getAPIURL()}/share/${id}/users`, {}, cb);
    },
};

export default shareAPI;
