import React, { Component } from 'react';
import User from './User.jsx';
import { Row, Col, Tab, Alert } from 'react-bootstrap/lib';

/**
 * The listing for a group of users in a tab.
 */
class UserTab extends Component {
    getAlert = (isUserSignedIn) => {
        const signInButton = this.props.title === 'Learn' ?
            'kb-signin-large-1' : 'kb-signin-large-2';
        const message = isUserSignedIn ? 'No matches were found.' :
            'Please sign in to find matches.'
        return (
            <div>
                <Alert bsStyle="info" style={{ margin: '0px 15px' }}>
                    {message}
                    {!isUserSignedIn &&
                        <div style={{ marginTop: '15px' }}
                            id={signInButton}
                        />
                    }
                </Alert>
            </div>
        )
    }

    getUsers = (users, isUserSignedIn) => {
        // Show an alert if the user is not signed in but is viewing the Learn
        // or Share tab, or if the user is signed in but there are no matches.
        const showAlert = this.props.title !== 'All' &&
            (!isUserSignedIn || users.length === 0);
        if (showAlert) {
            return (this.getAlert(isUserSignedIn))
        }
        return users.map((user, i) => (
            <Col sm={12} md={6} key={user.id}>
                <User
                    id={user.id}
                    isLastUserToLoad={users.length === i + 1}
                    onDoneLoading={this.props.onDoneLoading}
                    name={`${user.first_name} ${user.last_name}`}
                    email={user.email}
                    image={user.image}
                    isUserSignedIn={isUserSignedIn}
                    renderButtons={this.props.renderButtons}
                    loadGoogleAPI={this.props.loadGoogleAPI}
                    errorHandler={this.props.errorHandler}
                />
            </Col>
        ))
    }

    render() {
        const { eventKey, title, heading, users, isUserSignedIn } = this.props;
        return (
            <Tab eventKey={eventKey} title={eventKey}>
                <h1>{heading}</h1>
                <Row className="show-grid">
                    {this.getUsers(users, isUserSignedIn)}
                </Row>
            </Tab>
        );
    }
}

export default UserTab;
