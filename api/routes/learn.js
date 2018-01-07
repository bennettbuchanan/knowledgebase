const Learn = require('../models/Learn');
const db = require('../util/getDatabase')();

function learn(app, log) {
    const learnModel = new Learn(log).setDatabase(db);

    app.post('/learn', (req, res) => {
        log.debug('creating new learn entry');
        const { userId, techId } = req.query;
        learnModel.setUserId(userId)
            .setTechId(techId)
            .create((err, data) => {
                if (err) {
                    log.error('error creating new learn entry', {
                        error: err,
                        params: req.params,
                    });
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400)
                            .send('Please try again with a different ' +
                            'learnnology.');
                    }
                    return res.status(500).send('Could not create a new ' +
                        'learn. Please try again later.');
                }
                log.info('created new learn entry');
                return res.send(data);
            });
    });

    app.get('/learn', (req, res) => {
        log.debug('getting id of learn entry');
        const { userId, techId } = req.query;
        learnModel.setUserId(userId)
            .setTechId(techId)
            .getLearnId((err, data) => {
                if (err) {
                    log.error('error getting id of learn entry', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not get a learn ' +
                        'learn entry. Please try again later.');
                }
                log.info('retrieved learn entry id');
                return res.send(data);
            });
    });

    app.delete('/learn/:id', (req, res) => {
        log.debug('deleting learn entry');
        const { id } = req.params;
        learnModel.setPrimaryKey(id)
            .delete((err, data) => {
                if (err) {
                    log.error('error deleting learn entry', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not delete learn ' +
                        'entry. Please try again later.');
                }
                log.info('created new learn entry');
                return res.send(data);
            });
    });

    app.get('/learn/:techId/users', (req, res) => {
        log.debug('getting all users that want to learn a technology');
        const { techId } = req.params;
        learnModel.setTechId(techId)
            .getAllUsers((err, data) => {
                if (err) {
                    log.error('error getting all users learning a technology', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not get all users ' +
                        'learning a technology. Please try again later.');
                }
                log.info('retrieved all users learning a technology');
                return res.send(data);
            });
    });
}

module.exports = learn;
