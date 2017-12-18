import routeRequest from './routeRequest';
import getAPIURL from './getAPIURL';

const learnAPI = {
    /**
     * Add a new technology the user wants to learn.
     * @param {Object} query - The query object with the technology information.
     * @param {Object} query.userId - The id of the user.
     * @param {Object} query.techId - The id of the technology.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    add(query, cb) {
        return routeRequest('POST', `${getAPIURL()}/learn`, query, cb);
    },

    /**
     * List all the users that want to learn a technology.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getAllUsers(id, cb) {
        return routeRequest('GET', `${getAPIURL()}/learn/${id}/users`, {}, cb);
    },
};

export default learnAPI;
