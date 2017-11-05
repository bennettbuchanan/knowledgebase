import routeRequest from './routeRequest';

const stackExchangeAPI = {
    /**
     * Get the tag on stack exchange.
     * @param {String} tag - The requested tag to find.
     * @param {Function} cb - The callback function.
     * @return {undefined}
     */
    getTag(tag, cb) {
        return routeRequest('GET', 'https://api.stackexchange.com/2.2/tags/' +
            `${tag}/info?site=stackoverflow`, {}, (err, data) => {
            if (err) {
                return cb(err);
            }
            const { items } = data;
            if (items.length < 1) {
                return cb(`Unknown technology '${tag}'.`);
            }
            const stackExchangeTag = data.items[0].name;
            return cb(null, stackExchangeTag);
        });
    },
};

export default stackExchangeAPI;
