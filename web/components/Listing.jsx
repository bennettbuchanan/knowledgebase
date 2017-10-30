import React, { Component } from 'react';
import usersAPI from '../util/usersAPI';
import User from './User.jsx';
import { Grid, Row, Col, Tabs, Tab, Alert } from 'react-bootstrap/lib';

/**
 * The body of the application which lists users or displays an error.
 */
class Listing extends Component {
    state = {
        allUsers: [],
        error: null,
    }

    componentWillMount() {
        usersAPI.getAllUsers((err, data) => {
            this.setState({
                allUsers: data,
                error: err,
            })
        })
    }

    handleSelect(tabKey) {
        this.setState({ tabKey });
    }

    getListing(users) {
        return (
            <Row className="show-grid">
            {users.map(user =>
                <Col sm={12} md={6} key={user.id}>
                    <User id={user.id} username={user.first_name}/>
                </Col>)}
            </Row>
        )
    }

    render() {
        return (
            <Grid>
                <Row>
                {this.state.error ? (
                    <Alert bsStyle="danger">
                        <h4>Internal Error.</h4>
                        <p>Please try again later.</p>
                        <small>{this.state.error}</small>
                    </Alert>
                ) : (
                    <Tabs onSelect={this.handleSelect} id="controlled-tab">
                        <Tab eventKey={'All'} title="All">
                            {this.getListing(this.state.allUsers)}
                        </Tab>
                        <Tab eventKey={'Matches'} title="Matches">
                            Not yet implemented.
                        </Tab>
                    </Tabs>
                )}
                </Row>
            </Grid>
        );
    }
}

export default Listing;
