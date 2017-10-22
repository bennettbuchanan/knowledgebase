const assert = require('assert');
const logger = require('../../api/util/getLogger');

describe('Retrieving correct logger', () => {
    it('should get instance of logger', () => {
        assert.strictEqual(logger.name, 'knowledgebase');
        assert.strictEqual(logger.config.logLevel, 'info');
        assert.strictEqual(logger.config.dumpThreshold, 'error');
    });

    it('should get instance of request logger', () => {
        const log = logger.newRequestLogger();
        assert.strictEqual(log.uids.length, 1);
        assert.strictEqual(log.logLevel, 'info');
        assert.strictEqual(log.dumpThreshold, 'error');
    });
});
