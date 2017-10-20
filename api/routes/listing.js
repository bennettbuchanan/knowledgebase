const express = require('express');

function listingRoutes(app, log) {
    app.get('/listing', (req, res) => {
        res.send('Hello World!');
    })
}

module.exports = listingRoutes;
