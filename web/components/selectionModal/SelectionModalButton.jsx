import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';

/**
 * The selection modal button.
 */
class SelectionModalButton extends Component {

    render() {
        return (
            <Button
                bsSize="large"
                block
                onClick={this.props.onClick}
            >
                Done
            </Button>
        );
    }
}

export default SelectionModalButton;
