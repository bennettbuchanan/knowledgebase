const async = require('async');
const getDatabase = require('../../api/util/getDatabase');
const logger = require('../../api/util/getLogger');
const userTests = require('./user');
const techTests = require('./tech');
const shareTests = require('./share');
const learnTests = require('./learn');

const db = getDatabase();
const log = logger.newRequestLogger();

function clearTables(cb) {
    return async.series([
        next => db.query('TRUNCATE TABLE user', log, next),
        next => db.query('TRUNCATE TABLE tech', log, next),
        next => db.query('TRUNCATE TABLE learn', log, next),
        next => db.query('TRUNCATE TABLE share', log, next),
    ], cb);
}

describe('Routes and database functionality', () => {
    beforeEach(done => clearTables(done));
    afterEach(done => clearTables(done));

    describe('Users tests', () => userTests());
    describe('Tech tests', () => techTests());
    describe('Share tests', () => shareTests());
    describe('Learn tests', () => learnTests());
});
