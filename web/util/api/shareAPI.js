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
     * List all the users that want to share a technology.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getAllUsers(id, cb) {
        return routeRequest('GET', `${getAPIURL()}/share/${id}/users`, {}, cb);
    },
};

export default shareAPI;
