import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib';
import SelectionModalInput from './SelectionModalInput.jsx';

/**
 * The input for how the user wants to participate.
 */
class SelectionModalForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        validationState: null,
    }

    handleChange = (e) => this.setState({ value: e.target.value });

    getValidationState() {
        return this.props.errorMessage || this.state.errorMessage ?
            'error' : null;
    }

    getModalContent() {
        const { value } = this.state;

        return (
            <FormGroup
                validationState={this.getValidationState()}>
                <SelectionModalInput
                    label={this.props.label}
                    category={this.props.category}
                    onPressKey={this.props.onPressKey}
                    onPressEnter={this.props.onPressEnterLearn}
                    tags={this.props.tagList}
                    errorMessage={this.props.errorMessage}
                />
            </FormGroup>
        )
    }

    render() {
        return (this.getModalContent());
    }
}

export default SelectionModalForm;
