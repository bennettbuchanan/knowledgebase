import React, { Component } from 'react';
import { Grid, Jumbotron, Button } from 'react-bootstrap/lib';
import SignUpButton from './SignUpButton.jsx';

/**
 * Login sign up.
 */
class SignUp extends Component {
    render() {
        return (
            <div id='google-authentication'>
                <Jumbotron>
                    <h1>{'Sign Up'}</h1>
                    <SignUpButton onClick={this.props.onSignUp}/>
                </Jumbotron>
            </div>
        );
    }
}

export default SignUp;
