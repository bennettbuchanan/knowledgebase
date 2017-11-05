import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';


/**
 * The selection modal button.
 */
class SelectionModalList extends Component {
    renderTag = (text, i) => {
        const { onClickTag } = this.props;

        return (
            <div className={'tag-container'} key={i}>
                <div id={'close-icon'} onClick={() => onClickTag(i, this.props.category)}>
                    &times;
                </div>
                <div id={'tag-text'}>
                    {text}
                </div>
            </div>
        );
    };

    render() {
        const { tagList, onClickRemoveTag } = this.props;

        return (
            <div id={'tag-list'}>
                {tagList.map(this.renderTag)}
            </div>
        );
    }
}

export default SelectionModalList;
