import async from 'async';
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

    /**
     * Get the IDs of the given technologies.
     * @param {Array} technologies - The array of tech to get the IDs for.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getTechIds(technologies, cb) {
        async.map(technologies, (t, next) =>
            this.getNamedTech(t.name, (err, res) =>
                next(err, res[0].id)),
        cb);
    },
};

export default techAPI;
