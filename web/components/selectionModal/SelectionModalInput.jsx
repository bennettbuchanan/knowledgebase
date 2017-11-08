import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { FormGroup, ControlLabel, FormControl,
    HelpBlock } from 'react-bootstrap/lib';

/**
 * The input for how the user wants to participate.
 */
class SelectionModalInput extends Component {
    state = {
        value: '',
        errorMessage: '',
        validationState: null,
    }

    handleChange = (e) => this.setState({ value: e.target.value });

    handleKeyPress = (e) => {
        const { category, onPressKey } = this.props;
        onPressKey(category);
        this.setState({
            validationState: null,
            errorMessage: ''
        });
        if (e.key !== 'Enter') {
            return undefined;
        }
        const { value } = this.state;
        const { tags } = this.props;

        if (value === '') return undefined;
        if (value.length > 50) {
            return this.setState({
                errorMessage: `Unknown \ntechnology '${value}'.`,
                value: ''
            });
        };
        if (tags.includes(value)) {
            return this.setState({
                errorMessage: `Technology '${value}' already added.`,
                value: ''
            });
        }
        this.props.onPressEnter(value, category);
        this.setState({ value: '' });
    };

    getValidationState() {
        return this.props.errorMessage || this.state.errorMessage ?
            'error' : null;
    }

    getModalContent() {
        const { value } = this.state;
        const spinnerStyle = {
            display: this.props.fetchingFromAPI ? 'block' : 'none',
            marginLeft: '5px',
        };

        return (
            <div>
                <div style={{display: 'flex'}}>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    <div style={spinnerStyle}>
                        <Spinner name="circle" />
                    </div>
                </div>
                <FormControl
                    type='text'
                    value={this.state.value}
                    placeholder='Ex: python, javascript, c'
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}/>
                <FormControl.Feedback />
                <HelpBlock id={'help-block'}>
                    {this.props.errorMessage || this.state.errorMessage}
                </HelpBlock>
            </div>
        )
    }

    render() {
        return (this.getModalContent());
    }
}

export default SelectionModalInput;
