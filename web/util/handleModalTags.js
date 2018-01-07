import async from 'async';
import learnAPI from './api/learnAPI';
import shareAPI from './api/shareAPI';
import techAPI from './api/techAPI';

function addTags(tags, userId, action, cb) {
    const api = action === 'learn' ? learnAPI : shareAPI;
    return async.each(tags, (tag, next) =>
        techAPI.getNamedTech(tag, (err1, data1) => {
            if (err1) {
                return next(err1);
            }
            if (data1.length > 0) {
                return api.add({
                    userId,
                    techId: data1[0].id,
                }, next);
            }
            return techAPI.addNewTech({ name: tag }, (err2, data2) => {
                if (err2) {
                    return next(err2);
                }
                return api.add({
                    userId,
                    techId: data2.insertId,
                }, next);
            });
        }), cb);
}

function deleteTags(tags, userId, action, cb) {
    const api = action === 'learn' ? learnAPI : shareAPI;
    return async.each(tags, (tag, next) =>
        techAPI.getNamedTech(tag, (err1, data1) => {
            if (err1) {
                return next(err1);
            }
            return api.getId({
                userId,
                techId: data1[0].id,
            }, (err2, data2) => {
                if (err2) {
                    return next(err2);
                }
                return api.delete(data2[0].id, next);
            });
        }), cb);
}

export {
    addTags,
    deleteTags,
};
