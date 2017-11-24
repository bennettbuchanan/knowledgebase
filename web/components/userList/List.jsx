import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import usersAPI from '../../util/api/usersAPI';
import User from './User.jsx';
import { Grid, Row, Col } from 'react-bootstrap/lib';

/**
 * The body of the application which lists users or displays an error.
 */
class List extends Component {
    state = {
        allUsers: [],
        loadingContent: true,
    }

    componentWillMount() {
        usersAPI.getAllUsers((err, data) => {
            if (err) {
                this.onDoneLoading();
                return this.props.errorHandler(err);
            }
            this.setState({ allUsers: data })
        })
    }

    onDoneLoading = () => {
        this.props.onDoneLoading();
        this.setState({ loadingContent: false })
    };

    getList(users) {
        return (
            <Row className="show-grid">
            {users.map((user, i) => {
                return (
                    <Col sm={12} md={6} key={user.id}>
                        <User
                            id={user.id}
                            isLastUserToLoad={users.length === i + 1}
                            onDoneLoading={this.onDoneLoading}
                            name={user.first_name + ' ' + user.last_name}
                            image={user.image}
                            errorHandler={this.props.errorHandler}
                        />
                    </Col>
                )
            })}
            </Row>
        )
    }

    render() {
        const { loadingContent } = this.state;
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
                        {this.getList(this.state.allUsers)}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default List;
