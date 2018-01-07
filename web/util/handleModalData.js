import async from 'async';
import usersAPI from './api/usersAPI';
import { addTags, deleteTags } from './handleModalTags';

function _filterTags(arr1, arr2) {
    return arr1.filter(tag => !arr2.includes(tag));
}

function handleModalData(learnTags, shareTags, googleProfile, cb) {
    const name = googleProfile.getName().split(' ');
    const query = {
        firstName: name[0],
        lastName: name[1],
        image: googleProfile.getImageUrl(),
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
        next => addTags(learnTags, userId, 'learn', next),
        next => addTags(shareTags, userId, 'share', next),
    ], cb);
}

function handleModalDataUpdate(tags, userId, cb) {
    // Compare preexisitng tags with difference.
    const {
        preexistingLearnTags,
        preexistingShareTags,
        learnTags,
        shareTags,
    } = tags;
    const learnTagsToAdd = _filterTags(learnTags, preexistingLearnTags);
    const shareTagsToAdd = _filterTags(shareTags, preexistingShareTags);
    const learnTagsToDelete = _filterTags(preexistingLearnTags, learnTags);
    const shareTagsToDelete = _filterTags(preexistingShareTags, shareTags);
    return async.series([
        next => addTags(learnTagsToAdd, userId, 'learn', next),
        next => addTags(shareTagsToAdd, userId, 'share', next),
        next => deleteTags(learnTagsToDelete, userId, 'learn', next),
        next => deleteTags(shareTagsToDelete, userId, 'share', next),
    ], cb);
}

export {
    handleModalData,
    handleModalDataUpdate,
};
