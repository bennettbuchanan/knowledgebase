import React, { Component } from 'react';
import usersAPI from '../util/usersAPI';
import User from './User.jsx';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap/lib';

/**
 * The body of the application which lists users or displays an error.
 */
class List extends Component {
    state = { allUsers: [] }

    componentWillMount() {
        usersAPI.getAllUsers((err, data) => {
            if (err) {
                return this.props.errorHandler(err);
            }
            this.setState({ allUsers: data })
        })
    }

    handleSelect(tabKey) {
        this.setState({ tabKey });
    }

    getList(users) {
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
                    <Tabs onSelect={this.handleSelect} id="controlled-tab">
                        <Tab eventKey={'All'} title="All">
                            {this.getList(this.state.allUsers)}
                        </Tab>
                        <Tab eventKey={'Matches'} title="Matches">
                            Not yet implemented.
                        </Tab>
                    </Tabs>
                </Row>
            </Grid>
        );
    }
}

export default List;
