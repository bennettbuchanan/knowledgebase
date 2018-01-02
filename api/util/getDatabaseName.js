function getDatabaseName() {
    if (process.env.NODE_ENV === 'prod') {
        return process.env.MYSQL_DB;
    }
    if (process.env.NODE_ENV === 'test') {
        return 'knowledgebase_test';
    }
    return 'knowledgebase';
}

module.exports = getDatabaseName;
