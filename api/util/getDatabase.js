const Database = require('../models/Database');
const getDatabaseName = require('./getDatabaseName');

function getDatabase() {
    return new Database().setName(getDatabaseName());
}

module.exports = getDatabase;
