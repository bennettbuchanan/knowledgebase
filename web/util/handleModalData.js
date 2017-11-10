import async from 'async';
import usersAPI from './api/usersAPI';
import handleModalTags from './handleModalTags';

function handleModalData(learnTags, shareTags, googleProfile, cb) {
    const name = googleProfile.getName().split(' ');
    const query = {
        firstName: name[0],
        lastName: name[1],
        email: googleProfile.getEmail(),
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
