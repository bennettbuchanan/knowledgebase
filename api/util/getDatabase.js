const Database = require('../models/Database');
const getDatabaseName = require('./getDatabaseName');
const getConnection = require('./getConnection');

function getDatabase() {
    return new Database()
        .setConnection(getConnection())
        .setName(getDatabaseName());
}

module.exports = getDatabase;
