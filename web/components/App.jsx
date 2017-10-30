import async from 'async';
import React, { Component } from 'react';
import { Alert, Grid } from 'react-bootstrap/lib';
import Header from './Header.jsx';
import List from './List.jsx';
import SelectionModal from './selectionModal/SelectionModal.jsx';
import usersAPI from '../util/usersAPI';
import handleModalTags from '../util/handleModalTags';

/**
 * The toplevel application component to render as the root node.
 */
class App extends Component {
    state = {
        showModal: true,
        error: null,
        errorMessage: '',
    }

    showError = (err) => {
        this.setState({
            error: err,
            errorMessage: 'Please try again later.',
        });
    }

    handleModalData = (learnTags, shareTags) => {
        // TODO: Remove once user information is attained through login.
        const n = Math.floor(Math.random() * 100000);
        const query = {
            firstName: 'test-user-' + n,
            lastName: 'test-user-' + n,
            email: 'test-user-email' + n + '@null.com',
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
        ], err => {
            if (err) {
                this.setState({
                    error: err,
                    errorMessage: 'Please try again later.',
                });
            }
            this.setState({ showModal: false });
        });
    }

    getContent() {
        if (this.state.error) {
            return (
                <Grid>
                    <Alert bsStyle="danger">
                        <h3>Internal Error.</h3>
                        <p>{this.state.errorMessage}</p>
                        <small>{`${this.state.error}`}</small>
                    </Alert>
                </Grid>
            )
        }
        if (this.state.showModal) {
            return (<SelectionModal onClose={this.handleModalData}/>)
        }
        return (<List errorHandler={this.showError}/>)
    }

    render() {
        return (
            <div>
                <Header />
                {this.getContent()}
            </div>
        )
    }
}

export default App;
