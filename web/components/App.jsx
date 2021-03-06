import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { Alert, Grid } from 'react-bootstrap/lib';
import Header from './Header.jsx';
import List from './userList/List.jsx';
import SelectionModal from './selectionModal/SelectionModal.jsx';
import ProfileSettings from './profileSettings/SelectionModal.jsx';
import Login from './login/Login.jsx';
import { handleModalData, handleModalDataUpdate }
    from '../util/handleModalData.js';
import usersAPI from '../util/api/usersAPI.js';

const CLIENT_ID = '200156518240-7qlrk60340sikfo2dqfhao56omfq49pk' +
    '.apps.googleusercontent.com';

/**
 * The toplevel application component to render as the root node.
 */
class App extends Component {
    state = {
        showModal: true,
        showProfileSettings: false,
        isUserSignedIn: false,
        isUserInDatabase: null,
        error: null,
        errorMessage: '',
        profile: null,
        gapi: null,
        loadingContent: true,
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
        this.setState({
            isUserSignedIn: false,
            isUserInDatabase: null,
            showModal: true,
        });
        const { gapi } = this.state;
        const auth = gapi.auth2.getAuthInstance();
        // We need to rerender the resources when the sign in page is viewed.
        auth.signOut().then(() => this.loadGoogleAPI(this.renderButtons));
    };

    updateProfile = () => {
        this.setState({ showProfileSettings: true });
    }

    loadGoogleAPI = (action) => gapi.load('auth2', () =>
        gapi.auth2.init({ client_id: CLIENT_ID }).then(() => {
            action(gapi);
            this.setState({ loadingContent: false });
        }));

    renderButtons = (gapi) => {
        const largeButton = {
            'scope': 'email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.signIn,
            'onfailure': this.errorHandler,
        };
        // TODO: Use kb-signin-large when adding 'About' page.
        // gapi.signin2.render('kb-signin-large', largeButton);
        gapi.signin2.render('kb-signin-small', {
            'scope': 'email',
            'width': 120,
            'height': 34,
            'onsuccess': this.signIn,
            'onfailure': this.errorHandler,
        });
        gapi.signin2.render('kb-signin-large-1', largeButton);
        gapi.signin2.render('kb-signin-large-2', largeButton);
        const googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.attachClickHandler('collapsed-sign-in', {}, this.signIn,
            this.errorHandler);
    }

    handleModalData = (learnTags, shareTags) => {
        this.setState({ loadingContent: true });
        const { profile } = this.state;
        handleModalData(learnTags, shareTags, profile, err => {
            if (err) {
                this.setState({
                    error: err,
                    errorMessage: 'Please try again later.',
                    loadingContent: false,
                });
            }
            this.setState({ showModal: false });
        });
    }

    handleModalDataUpdate = (tags, userId, err) => {
        handleModalDataUpdate(tags, userId, err => {
            if (err) {
                this.setState({
                    error: err,
                    errorMessage: 'Please try again later.',
                    loadingContent: false,
                });
            }
            this.setState({ showProfileSettings: false });
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

    onDoneLoading = () => {
        this.setState({ loadingContent: false });
    };

    getContent() {
        const { error, errorMessage, isUserSignedIn, isUserInDatabase,
            showModal, showProfileSettings, profile,
            loadingContent } = this.state;

        if (error) {
            return this.getError(error, errorMessage);
        }
        if (!isUserSignedIn) {

        }
        // When a user first signs in, check if the user is in the database.
        if (isUserSignedIn && isUserInDatabase === null) {
            return usersAPI.getUser(profile.getEmail(), (err, data) => {
                if (err) {
                    return this.setState({ error: err });
                }
                this.setState({
                    isUserInDatabase: data.length > 0,
                    loadingContent: false,
                });
            });
        }
        if (showProfileSettings) {
            return (
                <ProfileSettings
                    onClose={this.handleModalDataUpdate}
                    profile={profile}
                />
            )
        }
        if (!isUserInDatabase && isUserSignedIn && showModal) {
            const modalStyle = {
                display: loadingContent ? 'none' : 'block',
            };
            const spinnerStyle = {
                display: loadingContent ? 'block' : 'none',
            };
            return (
                <div>
                    <div id='page-load'>
                        <div id='spinner' style={spinnerStyle}>
                            <Spinner name="circle" />
                        </div>
                    </div>
                    <div style={modalStyle}>
                        <SelectionModal
                            onClose={this.handleModalData}
                            profile={profile}
                        />
                    </div>
                </div>
            )
        }
        const listStyle = {
            display: loadingContent ? 'none' : 'block',
        };
        const spinnerStyle = {
            display: loadingContent ? 'block' : 'none',
        };
        return (
            <div>
                <div id='page-load'>
                    <div id='spinner' style={spinnerStyle}>
                        <Spinner name="circle" />
                    </div>
                </div>
                <div style={listStyle}>
                    <List
                        profile={this.state.profile}
                        isUserSignedIn={isUserSignedIn}
                        renderButtons={this.renderButtons}
                        loadGoogleAPI={this.loadGoogleAPI}
                        errorHandler={this.errorHandler}
                        onDoneLoading={this.onDoneLoading}
                    />
                </div>
            </div>
        )
    }

    render() {
        const { isUserSignedIn, profile } = this.state;
        return (
            <div>
                <Header
                    isLoginView={!isUserSignedIn}
                    onUpdateProfile={this.updateProfile}
                    onSignOut={this.signOut}
                    onSignIn={this.signIn}
                    userImage={profile && profile.getImageUrl()}
                />
                {this.getContent()}
            </div>
        )
    }
}

export default App;
