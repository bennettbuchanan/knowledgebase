function setup() {
    return null;
}

function up(db, cb) {
    db.createTable('learn', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        user_id: {
            type: 'int',
            notNull: true,
        },
        tech_id: {
            type: 'int',
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
