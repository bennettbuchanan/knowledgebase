import async from 'async';
import usersAPI from './api/usersAPI';
import handleModalTags from './handleModalTags';

function handleModalData(learnTags, shareTags, cb) {
    // TODO: Remove once user information is attained through login.
    const n = Math.floor(Math.random() * 100000);
    const query = {
        firstName: `test-user-${n}`,
        lastName: `test-user-${n}`,
        email: `test-user-email${n}@null.com`,
    };
    let userId;
    return async.series([
        next => usersAPI.createUser(query, (err, data) => {
            if (err) {
                return next(err);
            }
            userId = data.insertId;
            return next();
        }),
        next => handleModalTags(learnTags, userId, 'learn', next),
        next => handleModalTags(shareTags, userId, 'share', next),
    ], cb);
}

export default handleModalData;
