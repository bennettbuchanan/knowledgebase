import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';

/**
 * The selection modal button.
 */
class SelectionModalButton extends Component {

    render() {
        return (
            <Button id={'modal-button'} onClick={this.props.onClick}>Done</Button>
        );
    }
}

export default SelectionModalButton;
