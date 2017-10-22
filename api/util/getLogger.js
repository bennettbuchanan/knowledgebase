const werelogs = require('werelogs');
const config = require('../../conf/config.json');

werelogs.configure({
    level: config.log.level,
    dump: config.log.dump,
});

module.exports = new werelogs.Logger('knowledgebase');
