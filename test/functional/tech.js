const assert = require('assert');
const request = require('request');
const parseJSON = require('../util/parseJSON');

function tech() {
    it('should add a technology to the database', (done) => {
        const options = {
            uri: 'http://localhost:3000/tech',
            qs: {
                name: 'a',
            },
        };
        request.post(options, (err, response, body) => {
            if (err) {
                return done(err);
            }
            assert.strictEqual(response.statusCode, 200);
            assert.deepStrictEqual(parseJSON(body), {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 1,
                serverStatus: 2,
                warningCount: 0,
                message: '',
                protocol41: true,
                changedRows: 0,
            });
            return done();
        });
    });

    describe('Operations on existing technology', () => {
        beforeEach((done) => {
            const options = {
                uri: 'http://localhost:3000/tech',
                qs: {
                    name: 'a',
                },
            };
            return request.post(options, done);
        });

        it('should return 400 error if using the technology name twice',
            (done) => {
                const options = {
                    uri: 'http://localhost:3000/tech',
                    qs: {
                        name: 'a',
                    },
                };
                request.post(options, (err, response, body) => {
                    if (err) {
                        return done(err);
                    }
                    assert.strictEqual(response.statusCode, 400);
                    assert.strictEqual(body,
                        'Please try again with a different technology.');
                    return done();
                });
            });

        it('should list all technologies', done =>
            request.get('http://localhost:3000/tech',
                (err, response, body) => {
                    if (err) {
                        return done(err);
                    }
                    assert.strictEqual(response.statusCode, 200);
                    const data = parseJSON(body);
                    assert.strictEqual(data.length, 1);
                    assert.deepStrictEqual(data[0], {
                        id: 1,
                        name: 'a',
                    });
                    return done();
                }));

        it('should delete a technology', done =>
            request.delete('http://localhost:3000/tech/1',
                (err, response, body) => {
                    if (err) {
                        return done(err);
                    }
                    assert.strictEqual(response.statusCode, 200);
                    assert.deepStrictEqual(parseJSON(body), {
                        fieldCount: 0,
                        affectedRows: 1,
                        insertId: 0,
                        serverStatus: 2,
                        warningCount: 0,
                        message: '',
                        protocol41: true,
                        changedRows: 0,
                    });
                    return done();
                }));
    });
}

module.exports = tech;
