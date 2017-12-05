import async from 'async';
import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import UserTab from './UserTab.jsx';
import usersAPI from '../../util/api/usersAPI';
import techAPI from '../../util/api/techAPI';
import shareAPI from '../../util/api/shareAPI';
import learnAPI from '../../util/api/learnAPI';
import { Grid, Row, Tabs } from 'react-bootstrap/lib';

/**
 * Get users matching the given technologies.
 * @param {Array} techIds The array of technology IDs to match with.
 * @param {Number} userId The ID of the user finding matches.
 * @param {Object} api The API to get all users from.
 * @param {Function} cb - The callback function.
 * @return {undefined}
 */
function getMatches(techIds, userId, getAllUsers, cb) {
    const matches = [];
    return async.each(techIds, (id, next) =>
        getAllUsers(id, (err, users) => {
            if (err) {
                return next(err);
            }
            users.forEach(user => {
                if (!matches.some(match => match.id === user.id) &&
                    user.id !== userId) {
                    matches.push(user);
                }
            });
            return next();
    }), err => cb(err, matches));
};

/**
 * The body of the application which lists users or displays an error.
 */
class List extends Component {
    state = {
        shareUsers: [],
        learnUsers: [],
        allUsers: [],
        loadingContent: true,
    }

    getStateMatches = (stateKey, id, cb) => {
        const { sharing, learning } = usersAPI;
        // The API to get technologies the user is either sharing or learning.
        const getTech = stateKey === 'shareUsers' ? sharing : learning;
        // The API to get all users learning or sharing the given technologies.
        const getAllUsers = stateKey === 'shareUsers' ?
            learnAPI.getAllUsers : shareAPI.getAllUsers;
        async.waterfall([
            next => getTech(id, next),
            (tech, next) => techAPI.getTechIds(tech, next),
            (techIds, next) => getMatches(techIds, id, getAllUsers, next),
        ], (err, users) => {
            if (err) {
                return cb(err);
            }
            const state = {};
            state[stateKey] = users;
            this.setState(state);
            return cb(null, id);
        });
    }

    componentWillMount() {
        const { profile } = this.props;
        let userId;

        async.waterfall([
            next => usersAPI.getAllUsers((next)),
            (allUsers, next) => {
                // Set state here so the initial view shows as soon as possible.
                this.setState({ allUsers });
                return next();
            },
            next => usersAPI.getUserId(profile.getEmail(), next),
            (id, next) => this.getStateMatches('shareUsers', id, next),
            (id, next) => this.getStateMatches('learnUsers', id, next),
        ], (err) => {
            if (err) {
                this.onDoneLoading();
                this.props.errorHandler(err);
            }
        });
    }

    onSelectTab = (tabKey) => this.setState({ tabKey });

    onDoneLoading = () => {
        this.props.onDoneLoading();
        this.setState({ loadingContent: false })
    };

    render() {
        const { loadingContent, allUsers, learnUsers, shareUsers } = this.state;
        const listingStyle = {
            display: loadingContent ? 'none' : 'block',
        };
        const spinnerStyle = {
            display: loadingContent ? 'block' : 'none',
        };
        return (
            <div>
                <div style={spinnerStyle}>
                    <div id='page-load'>
                        <div id='spinner'>
                            <Spinner name="circle" />
                        </div>
                    </div>
                </div>
                <div style={listingStyle}>
                    <Grid>
                        <Row>
                            <Tabs
                                onSelect={this.onSelectTab}
                                id="controlled-tab"
                            >
                                <UserTab
                                    eventKey={'All'}
                                    title={'All'}
                                    heading={'All people'}
                                    users={allUsers}
                                    onDoneLoading={this.onDoneLoading}
                                    errorHandler={this.errorHandler}
                                />
                                <UserTab
                                    eventKey={'Learn'}
                                    title={'Learn'}
                                    heading={'People to learn from'}
                                    users={learnUsers}
                                    onDoneLoading={this.onDoneLoading}
                                    errorHandler={this.errorHandler}
                                />
                                <UserTab
                                    eventKey={'Share'}
                                    title={'Share'}
                                    heading={'People to share with'}
                                    users={shareUsers}
                                    onDoneLoading={this.onDoneLoading}
                                    errorHandler={this.errorHandler}
                                />
                            </Tabs>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default List;
