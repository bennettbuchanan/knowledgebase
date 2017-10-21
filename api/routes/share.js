const Share = require('../models/Share');
const db = require('../util/getDatabase')();

function share(app, log) {
    const shareModel = new Share(log).setDatabase(db);

    app.post('/share', (req, res) => {
        log.debug('creating new share entry');
        const { userId, techId } = req.query;
        shareModel.setUserId(userId)
            .setTechId(techId)
            .create((err, data) => {
                if (err) {
                    log.error('error creating new share entry', {
                        error: err,
                        params: req.params,
                    });
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400)
                            .send('Please try again with a different ' +
                            'technology.');
                    }
                    return res.status(500).send('Could not create a new ' +
                        'share entry. Please try again later.');
                }
                log.info('created new share entry');
                return res.send(data);
            });
    });

    app.delete('/share/:id', (req, res) => {
        log.debug('deleting share entry');
        const { id } = req.params;
        shareModel.setPrimaryKey(id)
            .delete((err, data) => {
                if (err) {
                    log.error('error deleting share entry', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not delete share ' +
                        'entry. Please try again later.');
                }
                log.info('created new share entry');
                return res.send(data);
            });
    });

    app.get('/share/:techId/users', (req, res) => {
        log.debug('getting all users that want to share a technology');
        const { techId } = req.params;
        shareModel.setTechId(techId)
            .getAllUsers((err, data) => {
                if (err) {
                    log.error('error getting all users sharing a technology', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not get all users ' +
                        'sharing a technology. Please try again later.');
                }
                log.info('retrieved all users sharing a technology');
                return res.send(data);
            });
    });
}

module.exports = share;
