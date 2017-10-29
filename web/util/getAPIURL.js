/**
 * Get the base path for the API URL.
 * @return {String} The base API URL.
 */
function getAPIURL() {
    const { hostname, protocol } = window.location;
    const apiPort = 3000;
    const endpoint = `${hostname}:${apiPort}`;
    return `${protocol}//${endpoint}`;
}

module.exports = getAPIURL;
