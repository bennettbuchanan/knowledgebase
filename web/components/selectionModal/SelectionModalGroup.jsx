import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';
import SelectionModalForm from './SelectionModalForm.jsx';
import SelectionModalList from './SelectionModalList.jsx';

/**
 * The selection modal selection group of input form and listing.
 */
class SelectionModalGroup extends Component {

    render() {
        const { tagList } = this.props;

        return (
            <div>
                <SelectionModalForm
                    label={this.props.label}
                    category={this.props.category}
                    onPressKey={this.props.onPressKey}
                    onPressEnterLearn={this.props.onPressEnterLearn}
                    onPressKeyShare={this.props.onPressKeyShare}
                    onPressEnterShare={this.props.onPressEnterShare}
                    tagList={tagList}
                    errorMessage={this.props.errorMessage}
                />
                <SelectionModalList
                    tagList={tagList}
                    category={this.props.category}
                    onClickTag={this.props.onClickTag}
                />
            </div>
        );
    }
}

export default SelectionModalGroup;
