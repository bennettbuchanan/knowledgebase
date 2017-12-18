import React, { Component } from 'react';
import User from './User.jsx';
import { Row, Col, Tab, Alert } from 'react-bootstrap/lib';

/**
 * The listing for a group of users in a tab.
 */
class UserTab extends Component {

    getUsers = (users) => {
        if (users.length === 0) {
            return (
                <Alert bsStyle="info" style={{ margin: '0px 15px' }}>
                    No matches were found.
                </Alert>
            )
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
                    errorHandler={this.props.errorHandler}
                />
            </Col>
        ))
    }

    render() {
        const { eventKey, title, heading, users } = this.props;
        return (
            <Tab eventKey={eventKey} title={eventKey}>
                <h1>{heading}</h1>
                <Row className="show-grid">
                    {this.getUsers(users)}
                </Row>
            </Tab>
        );
    }
}

export default UserTab;
