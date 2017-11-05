const assert = require('assert');
const request = require('request');
const async = require('async');
const parseJSON = require('../util/parseJSON');

function user() {
    it('should add a user to the database', (done) => {
        const options = {
            uri: 'http://localhost:3000/users',
            qs: {
                firstName: 'a',
                lastName: 'b',
                email: 'a@null.com',
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

    describe('Operations on existing user', () => {
        beforeEach((done) => {
            const options = {
                uri: 'http://localhost:3000/users',
                qs: {
                    firstName: 'a',
                    lastName: 'b',
                    email: 'a@null.com',
                },
            };
            return request.post(options, done);
        });

        it('should return 400 error if using the same email twice', (done) => {
            const options = {
                uri: 'http://localhost:3000/users',
                qs: {
                    firstName: 'a',
                    lastName: 'b',
                    email: 'a@null.com',
                },
            };
            request.post(options, (err, response, body) => {
                if (err) {
                    return done(err);
                }
                assert.strictEqual(response.statusCode, 400);
                assert.strictEqual(body,
                    'Please try again with a different email.');
                return done();
            });
        });

        it('should list all users', done =>
            request.get('http://localhost:3000/users',
                (err, response, body) => {
                    if (err) {
                        return done(err);
                    }
                    assert.strictEqual(response.statusCode, 200);
                    const data = parseJSON(body);
                    assert.strictEqual(data.length, 1);
                    assert.strictEqual(typeof data[0].timestamp, 'string');
                    delete data[0].timestamp;
                    assert.deepStrictEqual(data[0], {
                        id: 1,
                        first_name: 'a',
                        last_name: 'b',
                        email: 'a@null.com',
                    });
                    return done();
                }));

        it('should delete a user', done =>
            request.delete('http://localhost:3000/users/1',
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

        describe('List of what the user is learning or sharing', () => {
            const users = {
                1: 'a',
                2: 'b',
                3: 'c',
                4: 'd',
                5: 'e',
                6: 'f',
            };
            const technologies = {
                1: 'g',
                2: 'h',
                3: 'i',
                4: 'j',
                5: 'k',
                6: 'l',
            };

            beforeEach((done) => {
                async.series([
                    next => async.eachSeries(users, (u, cb) => {
                        const options = {
                            uri: 'http://localhost:3000/users',
                            qs: {
                                firstName: u,
                                lastName: u,
                                email: `${u}@null.com`,
                            },
                        };
                        return request.post(options, cb);
                    }, next),
                    next => async.eachSeries(technologies, (tech, cb) => {
                        const options = {
                            uri: 'http://localhost:3000/tech',
                            qs: {
                                name: tech,
                            },
                        };
                        request.post(options, cb);
                    }, next),
                    next => async.eachSeries([1, 2, 3], (techId, cb) => {
                        const options = {
                            uri: 'http://localhost:3000/learn',
                            qs: {
                                userId: 1,
                                techId,
                            },
                        };
                        return request.post(options, cb);
                    }, next),
                    next => async.eachSeries([4, 5, 6], (techId, cb) => {
                        const options = {
                            uri: 'http://localhost:3000/learn',
                            qs: {
                                userId: 2,
                                techId,
                            },
                        };
                        return request.post(options, cb);
                    }, next),
                    next => async.eachSeries([4, 5, 6], (techId, cb) => {
                        const options = {
                            uri: 'http://localhost:3000/share',
                            qs: {
                                userId: 1,
                                techId,
                            },
                        };
                        return request.post(options, cb);
                    }, next),
                    next => async.eachSeries([1, 2, 3], (techId, cb) => {
                        const options = {
                            uri: 'http://localhost:3000/share',
                            qs: {
                                userId: 2,
                                techId,
                            },
                        };
                        return request.post(options, cb);
                    }, next),
                ], done);
            });

            it('should list technologies a user wants to learn', (done) => {
                const options = {
                    uri: 'http://localhost:3000/users/1/learn',
                };
                request.get(options, (err, response, body) => {
                    if (err) {
                        return done(err);
                    }
                    assert.deepStrictEqual(parseJSON(body),
                        [{ name: 'g' }, { name: 'h' }, { name: 'i' }]);
                    return done();
                });
            });

            it('should list all technologies a user wants to share', (done) => {
                const options = {
                    uri: 'http://localhost:3000/users/1/share',
                };
                request.get(options, (err, response, body) => {
                    if (err) {
                        return done(err);
                    }
                    assert.deepStrictEqual(parseJSON(body),
                        [{ name: 'j' }, { name: 'k' }, { name: 'l' }]);
                    return done();
                });
            });
        });
    });
}

module.exports = user;
