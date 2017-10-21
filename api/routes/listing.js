function listingRoutes(app, log) {
    app.get('/listing', (req, res) => {
        log.debug('listing users');
        res.send('Hello World!');
    });
}

module.exports = listingRoutes;
