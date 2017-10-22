const mysql = require('mysql');
const getDatabaseName = require('./getDatabaseName');

function getConnection() {
    const isProduction = process.env.NODE_ENV === 'prod';
    return mysql.createConnection({
        host: 'localhost',
        user: isProduction ? process.env.MYSQL_USERNAME : 'root',
        database: getDatabaseName(),
        password: isProduction ? process.env.MYSQL_PASSWORD : undefined,
    });
}

module.exports = getConnection;
