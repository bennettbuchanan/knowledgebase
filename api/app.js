const express = require('express');
const werelogs = require('werelogs');
const listingRoutes = require('./routes/listing');

const app = express();
const log = new werelogs.Logger('KnowledgeBase');

listingRoutes(app, log);

app.listen(3000, () => {
    log.info('app started successfully on port 3000');
});
