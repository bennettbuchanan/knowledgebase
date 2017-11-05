import React, { Component } from 'react';
import { Modal } from 'react-bootstrap/lib';

/**
 * The selection modal containter.
 */
class SelectionModalTitle extends Component {
    render() {
        return (
            <Modal.Title>{this.props.title}</Modal.Title>
        );
    }
}

export default SelectionModalTitle;
