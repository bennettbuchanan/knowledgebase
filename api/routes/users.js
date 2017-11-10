const User = require('../models/User');
const db = require('../util/getDatabase')();

function users(app, log) {
    const userModel = new User(log).setDatabase(db);

    app.get('/users', (req, res) => {
        log.debug('getting all users');
        userModel.all((err, data) => {
            if (err) {
                log.error('error getting users', {
                    error: err,
                    params: req.params,
                });
                return res.status(500).send('Could not get users. Please ' +
                    'try again later.');
            }
            log.info('got all users');
            return res.send(data);
        });
    });

    app.get('/users/:email', (req, res) => {
        log.debug('getting user with a matching email');
        const { email } = req.params;
        userModel.get(email, (err, data) => {
            if (err) {
                log.error('error getting user by email', {
                    error: err,
                    params: req.params,
                });
                return res.status(500).send('Could not get user. Please ' +
                    'try again later.');
            }
            log.info('got user by email');
            return res.send(data);
        });
    });

    app.post('/users', (req, res) => {
        log.debug('creating new user');
        const { firstName, lastName, email } = req.query;
        userModel.setFirstName(firstName)
            .setLastName(lastName)
            .setEmail(email)
            .create((err, data) => {
                if (err) {
                    log.error('error creating new user', {
                        error: err,
                        params: req.params,
                    });
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400)
                            .send('Please try again with a different email.');
                    }
                    return res.status(500).send('Could not create a new ' +
                        'user. Please try again later.');
                }
                log.info('created new user');
                return res.send(data);
            });
    });

    app.delete('/users/:id', (req, res) => {
        log.debug('deleting user');
        const { id } = req.params;
        userModel.setPrimaryKey(id)
            .delete((err, data) => {
                if (err) {
                    log.error('error deleting user', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not delete user. ' +
                        'Please try again later.');
                }
                log.info('created new user');
                return res.send(data);
            });
    });

    app.get('/users/:id/learn', (req, res) => {
        log.debug('getting all learn entries for a user');
        userModel.setPrimaryKey(req.params.id)
            .learn((err, data) => {
                if (err) {
                    log.error('error getting learn entries', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not get learn. ' +
                        'Please try again later.');
                }
                log.info('got all learn entries');
                return res.send(data);
            });
    });

    app.get('/users/:id/share', (req, res) => {
        log.debug('getting all learn entries for a user');
        userModel.setPrimaryKey(req.params.id)
            .share((err, data) => {
                if (err) {
                    log.error('error getting share entries', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not get learn. ' +
                        'Please try again later.');
                }
                log.info('got all share entries');
                return res.send(data);
            });
    });
}

module.exports = users;
