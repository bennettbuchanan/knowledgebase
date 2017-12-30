const mysql = require('mysql');
const getDatabaseName = require('./getDatabaseName');

function getConnection() {
    const isProduction = process.env.NODE_ENV === 'prod';
    return mysql.createConnection({
        host: isProduction ? process.env.MYSQL_HOST : 'localhost',
        user: isProduction ? process.env.MYSQL_USERNAME : 'root',
        password: isProduction ? process.env.MYSQL_PASSWORD : undefined,
        database: getDatabaseName(),
    });
}

module.exports = getConnection;
