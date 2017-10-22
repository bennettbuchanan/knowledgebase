const assert = require('assert');
const getDatabase = require('../../api/util/getDatabase');
const logger = require('../../api/util/getLogger');

const log = logger.newRequestLogger();

describe('Database class', () => {
    it('should get instance of Database class', () => {
        const db = getDatabase();
        assert.strictEqual(typeof db, 'object');
        assert.strictEqual(db.name, 'knowledgebase_test');
    });

    it('should run a SQL query', (done) => {
        const db = getDatabase();
        db.query('SELECT * FROM user', log, (err, data) => {
            if (err) {
                return done(err);
            }
            assert.deepStrictEqual(data, []);
            db.endConnection();
            return done();
        });
    });
});
