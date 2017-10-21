function parseJSON(body) {
    let data;
    try {
        data = JSON.parse(body);
    } catch (e) {
        throw new Error(`Invalid JSON: ${e}`);
    }
    return data;
}

module.exports = parseJSON;
