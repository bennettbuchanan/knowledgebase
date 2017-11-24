import React, { Component } from 'react';
import { Grid, Jumbotron, Button } from 'react-bootstrap/lib';
import Info from './Info.jsx';

/**
 * Login view of the application.
 */
class Login extends Component {
    render() {
        return (
            <Grid>
                <div id='login-content'>
                    <Info />
                    <div id='google-authentication'>
                        <Jumbotron>
                            <h1>{'Sign Up'}</h1>
                            <p>Join knowledgebase today.</p>
                            <div id="kb-signin-large"></div>
                        </Jumbotron>
                    </div>
                </div>
            </Grid>
        );
    }
}

export default Login;
