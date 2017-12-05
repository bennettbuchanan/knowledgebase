import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { FormGroup, ControlLabel, FormControl, InputGroup, Button, HelpBlock }
    from 'react-bootstrap/lib';

/**
 * The input for how the user wants to participate.
 */
class SelectionModalInput extends Component {
    state = {
        value: '',
        errorMessage: '',
        validationState: null,
    }

    handleChange = (e) => {
        if (e.target.value.includes(',')) {
            return undefined;
        }
        this.setState({ value: e.target.value });
    }

    addTag = () => {
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
            });
        }
        this.props.onPressEnter(value, this.props.category);
        this.setState({ value: '' });
    }

    onClickAdd = () => {
        this.addTag();
    }

    handleKeyPress = (e) => {
        const { category, onPressKey } = this.props;
        onPressKey(category);
        this.setState({
            validationState: null,
            errorMessage: ''
        });
        if (e.key !== 'Enter' && e.key !== ',') {
            return undefined;
        }
        this.addTag();
    };

    getValidationState() {
        return this.props.errorMessage || this.state.errorMessage ?
            'error' : null;
    }

    getModalContent() {
        const { value } = this.state;
        const spinnerStyle = {
            opacity: this.props.fetchingFromAPI ? '100' : '0',
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
                <InputGroup>
                    <FormControl
                        type='text'
                        value={this.state.value}
                        placeholder='e.g. javascript, python, ruby-on-rails'
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}/>
                    <FormControl.Feedback />
                        <InputGroup.Button onClick={this.onClickAdd}>
                            <Button>
                                Add
                            </Button>
                        </InputGroup.Button>
                </InputGroup>
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

//     <InputGroup.Button onClick={this.onClickAdd}>
//         <Button>
//             Add
//         </Button>
//     </InputGroup.Button>

export default SelectionModalInput;
