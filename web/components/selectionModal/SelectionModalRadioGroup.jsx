import React, { Component } from 'react';
import { FormGroup, ControlLabel, Radio } from 'react-bootstrap/lib';

/**
 * The selection modal button.
 */
class SelectionModalButton extends Component {

    render() {
        const { onClick } = this.props;

        return (
            <FormGroup>
                <ControlLabel>How would you describe yourself?</ControlLabel>
                <Radio onClick={onClick} name="learnAndShare">
                    I want to learn and share technologies.
                </Radio>
                <Radio onClick={onClick} name="learn">
                    I only want to learn technologies.
                </Radio>
                <Radio onClick={onClick} name="share">
                    I only want to share technologies.
                </Radio>
            </FormGroup>
        );
    }
}

export default SelectionModalButton;
