import React, { Component } from 'react';
import { Alert, Grid } from 'react-bootstrap/lib';
import Header from './Header.jsx';
import List from './userList/List.jsx';
import SelectionModal from './selectionModal/SelectionModal.jsx';
import Login from './login/Login.jsx';
import handleModalData from '../util/handleModalData.js';
import usersAPI from '../util/api/usersAPI.js';

const CLIENT_ID = '200156518240-7qlrk60340sikfo2dqfhao56omfq49pk' +
    '.apps.googleusercontent.com';

/**
 * The toplevel application component to render as the root node.
 */
class App extends Component {
    state = {
        showModal: true,
        isUserSignedIn: false,
        isUserInDatabase: null,
        error: null,
        errorMessage: '',
        profile: null,
        gapi: null,
    }

    componentDidMount() {
        this.loadGoogleAPI((gapi) => {
            this.renderButtons(gapi);

            const auth = gapi.auth2.getAuthInstance();
            const currentUser = auth.currentUser.get();
            this.setState({
                gapi,
                isUserSignedIn: auth.isSignedIn.get(),
                profile: currentUser.getBasicProfile(),
            });
        });
    }

    signIn = (user) => this.setState({
        isUserSignedIn: true,
        profile: user.getBasicProfile(),
    });

    signOut = () => {
        this.setState({ isUserSignedIn: false });
        const { gapi } = this.state;
        const auth = gapi.auth2.getAuthInstance();
        // We need to rerender the resources when the sign in page is viewed.
        auth.signOut().then(() => this.loadGoogleAPI(this.renderButtons));
    };

    loadGoogleAPI = (action) => gapi.load('auth2', () =>
        gapi.auth2.init({ client_id: CLIENT_ID }).then(() => action(gapi)));

    renderButtons = (gapi) => {
        gapi.signin2.render('kb-signin-large', {
            'scope': 'email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.signIn,
            'onfailure': this.errorHandler,
        });
        gapi.signin2.render('kb-signin-small', {
            'scope': 'email',
            'width': 120,
            'height': 36,
            'onsuccess': this.signIn,
            'onfailure': this.errorHandler,
        });
        const googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.attachClickHandler('collapsed-sign-in', {}, this.signIn,
            this.errorHandler)
    }

    handleModalData = (learnTags, shareTags) => {
        const { profile } = this.state;
        handleModalData(learnTags, shareTags, profile, err => {
            if (err) {
                this.setState({
                    error: err,
                    errorMessage: 'Please try again later.',
                });
            }
            this.setState({ showModal: false });
        });
    }

    errorHandler = (err) => {
        // If the user closes the google auth window, do not show an error.
        if (err && err.error === 'popup_closed_by_user') {
            return undefined;
        }
        this.setState({
            error: err,
            errorMessage: 'Please try again later.',
        });
    }

    getError(error, errorMessage) {
        return (
            <Grid>
                <Alert bsStyle="danger">
                    <h3>Internal Error.</h3>
                    <p>{errorMessage}</p>
                    <small>{`${error}`}</small>
                </Alert>
            </Grid>
        )
    }

    getContent() {
        const { error, errorMessage, isUserSignedIn, isUserInDatabase,
            showModal, profile } = this.state;

        if (error) {
            return this.getError(error, errorMessage);
        }
        if (isUserSignedIn && isUserInDatabase === null) {
            usersAPI.getUser(profile.getEmail(), (err, data) => {
                if (err) {
                    return this.setState({ error: err });
                }
                this.setState({ isUserInDatabase: data.length > 0 });
            });
        }
        if (!isUserSignedIn) {
            return (<Login/>)
        }
        if (!isUserInDatabase && showModal) {
            return (
                <SelectionModal
                    onClose={this.handleModalData}
                    profile={profile}
                />
            )
        }
        return (<List errorHandler={this.errorHandler}/>)
    }

    render() {
        const { isUserSignedIn } = this.state;
        return (
            <div>
                <Header
                    isLoginView={!isUserSignedIn}
                    onSignOut={this.signOut}
                    onSignIn={this.signIn}
                />
                {this.getContent()}
            </div>
        )
    }
}

export default App;
