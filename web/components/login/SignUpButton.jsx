import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';

/**
 * The login continue with google sign up.
 */
class SignUpButton extends Component {
    render() {
        return (
            <Button
                bsStyle="success"
                bsSize="large"
                onClick={this.props.onClick}
            >
                {'Continue with Google'}
            </Button>
        );
    }
}

export default SignUpButton;
