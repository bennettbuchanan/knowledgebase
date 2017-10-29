const express = require('express');
const cors = require('cors');
const Logger = require('./models/Logger');
const users = require('./routes/users');
const tech = require('./routes/tech');
const learn = require('./routes/learn');
const share = require('./routes/share');

const app = express();
const log = Logger.newRequestLogger();

app.use(cors());

users(app, log);
tech(app, log);
learn(app, log);
share(app, log);

app.listen(3000, () =>
    log.info('application started successfully on port 3000'));
