/**
 * Get the base path for the API URL.
 * @return {String} The base API URL.
 */
function getAPIURL() {
    // Use 'production' here for webpack production build.
    if (process.env.NODE_ENV === 'production') {
        return process.env.API_ENDPOINT;
    }
    const { hostname, protocol } = window.location;
    const apiPort = 3000;
    const endpoint = `${hostname}:${apiPort}`;
    return `${protocol}//${endpoint}`;
}

module.exports = getAPIURL;
