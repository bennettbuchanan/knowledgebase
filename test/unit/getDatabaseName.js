const assert = require('assert');
const getDatabaseName = require('../../api/util/getDatabaseName');

describe('Retreiving correct database name', () => {
    it('should get the test database if NODE_ENV=test', () =>
        assert.strictEqual(getDatabaseName(), 'knowledgebase_test'));

    it('should get the production or development database if NODE_ENV=', () => {
        process.env.NODE_ENV = 'prod';
        assert.strictEqual(getDatabaseName(), 'knowledgebase');
        process.env.NODE_ENV = 'test';
    });
});
