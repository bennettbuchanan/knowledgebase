import routeRequest from './routeRequest';
import getAPIURL from './getAPIURL';

const techAPI = {
    /**
     * Add a new technology to the database.
     * @param {Object} query - The query object with the technology information.
     * @param {Object} query.name - The name of the technology.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    addNewTech(query, cb) {
        return routeRequest('POST', `${getAPIURL()}/tech`, query, cb);
    },

    /**
     * Get a technology from the database.
     * @param {Object} name - The name of the technology.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getNamedTech(name, cb) {
        return routeRequest('GET', `${getAPIURL()}/tech/${name}`, {}, cb);
    },
};

export default techAPI;
