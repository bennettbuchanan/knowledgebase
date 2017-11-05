import React, { Component } from 'react';
import { Grid, Jumbotron, Button } from 'react-bootstrap/lib';
import Info from './Info.jsx';
import SignUp from './SignUp.jsx';

/**
 * Login view of the application.
 */
class Login extends Component {
    continueWithGoogle = () => {
        this.props.onLogin();
    }

    render() {
        return (
            <Grid>
                <div id='login-content'>
                    <Info />
                    <SignUp onSignUp={this.continueWithGoogle}/>
                </div>
            </Grid>
        );
    }
}

export default Login;
