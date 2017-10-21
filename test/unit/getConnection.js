const assert = require('assert');
const getConnection = require('../../api/util/getConnection');

describe('Retreiving correct database connection', () => {
    it('should get the test database connection if NODE_ENV=test', () => {
        const connection = getConnection();
        const {
            host,
            user,
            password,
            database,
        } = connection.config;
        assert.strictEqual(host, 'localhost');
        assert.strictEqual(user, 'root');
        assert.strictEqual(password, undefined);
        assert.strictEqual(database, 'knowledgebase_test');
    });

    it('should get the production database connection if NODE_ENV=prod', () => {
        process.env.NODE_ENV = 'prod';
        process.env.MYSQL_USERNAME = 'username';
        process.env.MYSQL_PASSWORD = 'password';
        const connection = getConnection();
        const {
            host,
            user,
            password,
            database,
        } = connection.config;
        assert.strictEqual(host, 'localhost');
        assert.strictEqual(user, 'username');
        assert.strictEqual(password, 'password');
        assert.strictEqual(database, 'knowledgebase');
        process.env.NODE_ENV = 'test';
        process.env.MYSQL_USERNAME = '';
        process.env.MYSQL_PASSWORD = '';
    });
});
