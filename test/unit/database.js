const assert = require('assert');
const getDatabase = require('../../api/util/getDatabase');
const logger = require('../../api/util/getLogger');

const log = logger.newRequestLogger();

describe('Database class', () => {
    let db;

    beforeEach(() => {
        db = getDatabase();
    });

    afterEach(() => db.endConnection());

    it('should get instance of Database class', () => {
        assert.strictEqual(typeof db, 'object');
        assert.strictEqual(db.name, 'knowledgebase_test');
    });

    it('should run a SQL query', (done) => {
        db.query('SELECT * FROM user', log, (err, data) => {
            if (err) {
                return done(err);
            }
            assert.deepStrictEqual(data, []);
            return done();
        });
    });
});
