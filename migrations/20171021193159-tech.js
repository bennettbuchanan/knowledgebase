function setup() {
    return null;
}

function up(db, cb) {
    db.createTable('tech', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        name: {
            type: 'string',
            unique: true,
            notNull: true,
        },
    }, cb);
}

function down() {
    return null;
}

module.exports = {
    setup,
    up,
    down,
};
