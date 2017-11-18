const assert = require('assert');
const request = require('request');
const async = require('async');
const parseJSON = require('../util/parseJSON');

function learn() {
    it('should add a learn entry to the database', (done) => {
        const options = {
            uri: 'http://localhost:3000/learn',
            qs: {
                userId: 1,
                techId: 1,
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

    describe('Operations on an existing learn technology', () => {
        beforeEach((done) => {
            const options = {
                uri: 'http://localhost:3000/learn',
                qs: {
                    userId: 1,
                    techId: 1,
                },
            };
            request.post(options, done);
        });

        it('should delete a learn entry', done =>
            request.delete('http://localhost:3000/learn/1',
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

    describe('Users that want to learn a technology', () => {
        const users = {
            1: 'a',
            2: 'b',
            3: 'c',
            4: 'd',
            5: 'e',
            6: 'f',
        };

        beforeEach((done) => {
            async.series([
                next => async.eachSeries(users, (user, cb) => {
                    const options = {
                        uri: 'http://localhost:3000/users',
                        qs: {
                            firstName: user,
                            lastName: user,
                            image: user,
                            email: `${user}@null.com`,
                        },
                    };
                    return request.post(options, cb);
                }, next),
                (next) => {
                    const options = {
                        uri: 'http://localhost:3000/share',
                        qs: {
                            name: 'g',
                        },
                    };
                    return request.post(options, next);
                },
                next => async.eachSeries([1, 2, 3], (userId, cb) => {
                    const options = {
                        uri: 'http://localhost:3000/share',
                        qs: {
                            userId,
                            techId: 1,
                        },
                    };
                    return request.post(options, cb);
                }, next),
            ], done);
        });

        it('should list all users that want to share a technology', (done) => {
            const options = {
                uri: 'http://localhost:3000/share/1/users',
            };
            request.get(options, (err, response, body) => {
                if (err) {
                    return done(err);
                }
                assert.deepStrictEqual(parseJSON(body), [
                    {
                        id: 1,
                        first_name: 'a',
                        last_name: 'a',
                        image: 'a',
                        email: 'a@null.com',
                    }, {
                        id: 2,
                        first_name: 'b',
                        last_name: 'b',
                        image: 'b',
                        email: 'b@null.com',
                    }, {
                        id: 3,
                        first_name: 'c',
                        last_name: 'c',
                        image: 'c',
                        email: 'c@null.com',
                    },
                ]);
                return done();
            });
        });
    });
}

module.exports = learn;
