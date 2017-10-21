function setup() {
    return null;
}

function up(db, cb) {
    db.createTable('user', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        first_name: {
            type: 'string',
            notNull: true,
        },
        last_name: {
            type: 'string',
            notNull: true,
        },
        email: {
            type: 'string',
            unique: true,
            notNull: true,
        },
        timestamp: {
            type: 'datetime',
            notNull: true,
            defaultValue: 'CURRENT_TIMESTAMP',
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
