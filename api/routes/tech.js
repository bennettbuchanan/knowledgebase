const Tech = require('../models/Tech');
const db = require('../util/getDatabase')();

function tech(app, log) {
    const techModel = new Tech(log).setDatabase(db);

    app.get('/tech', (req, res) => {
        log.debug('getting all tech');
        techModel.all((err, data) => {
            if (err) {
                log.error('error getting tech', {
                    error: err,
                    params: req.params,
                });
                return res.status(500).send('Could not get technology. ' +
                    'Please try again later.');
            }
            log.info('got all tech');
            return res.send(data);
        });
    });

    app.post('/tech', (req, res) => {
        log.debug('creating new tech');
        const { name } = req.query;
        techModel.setName(name)
            .create((err, data) => {
                if (err) {
                    log.error('error creating new tech', {
                        error: err,
                        params: req.params,
                    });
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400)
                            .send('Please try again with a different ' +
                            'technology.');
                    }
                    return res.status(500).send('Could not create a new ' +
                        'tech. Please try again later.');
                }
                log.info('created new tech');
                return res.send(data);
            });
    });

    app.delete('/tech/:id', (req, res) => {
        log.debug('deleting tech');
        const { id } = req.params;
        techModel.setPrimaryKey(id)
            .delete((err, data) => {
                if (err) {
                    log.error('error deleting tech', {
                        error: err,
                        params: req.params,
                    });
                    return res.status(500).send('Could not delete tech. ' +
                        'Please try again later.');
                }
                log.info('created new tech');
                return res.send(data);
            });
    });
}

module.exports = tech;
