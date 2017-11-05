import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap/lib';
import stackExchangeAPI from '../../util/stackExchangeAPI';
import SelectionModalTitle from './SelectionModalTitle.jsx';
import SelectionModalGroup from './SelectionModalGroup.jsx';
import SelectionModalButton from './SelectionModalButton.jsx';

class SelectionModal extends Component {
    state = {
        showModal: true,
        showAlert: false,
        learnTags: [],
        shareTags: [],
        learnTagsErrorMessage: '',
        shareTagsErrorMessage: '',
    };

    onPressKey = (tagCategory) => {
        // Clear any error messages when user begins to input again.
        const stateToSet = { showAlert: false };
        stateToSet[`${tagCategory}ErrorMessage`] = '';
        this.setState(stateToSet);
    }

    onAddTag = (text, tagCategory) => {
        let stateToSet = {};
        const tag = text.replace(/ +/g, '-');
        stackExchangeAPI.getTag(tag, (err, tag) => {
            if (err) {
                stateToSet[`${tagCategory}ErrorMessage`] = `${err}`;
                return this.setState(stateToSet);
            }
            const tags = this.state[tagCategory];
            if (tags.includes(tag)) {
                stateToSet[`${tagCategory}ErrorMessage`] =
                    `Technology '${tag}' already added.`;
                return this.setState(stateToSet);
            }
            stateToSet[tagCategory] = [tag, ...tags];
            return this.setState(stateToSet);
        });
    }

    onRemoveTag = (index, tagCategory) => {
        const stateToSet = {};
        const tags = this.state[tagCategory];
        stateToSet[tagCategory] = tags.filter((tag, i) => i !== index);
        this.setState(stateToSet);
    }

    evaluateInput = () => {
        const { learnTags, shareTags } = this.state;
        if ((learnTags.length + shareTags.length) > 0) {
            this.setState({ showModal: false });
            const { onClose } = this.props;
            return onClose(learnTags, shareTags);
        }
        return this.setState({ showAlert: true });
    }

    render() {
        const { showModal, learnTags, shareTags, learnTagsErrorMessage,
            shareTagsErrorMessage, showAlert } = this.state;

        return (
            <Modal
                show={showModal}
                animation={false}
                backdrop={'static'}
                bsSize={'large'}
            >
                <Modal.Body>
                    <SelectionModalGroup
                        label={'What do you want to learn?'}
                        category={'learnTags'}
                        tagList={learnTags}
                        onPressKey={this.onPressKey}
                        onPressEnterLearn={this.onAddTag}
                        onClickTag={this.onRemoveTag}
                        errorMessage={learnTagsErrorMessage}
                    />
                    <SelectionModalGroup
                        label={'What do you want to share?'}
                        category={'shareTags'}
                        tagList={shareTags}
                        onPressKey={this.onPressKey}
                        onPressEnterLearn={this.onAddTag}
                        onClickTag={this.onRemoveTag}
                        errorMessage={shareTagsErrorMessage}
                    />
                    {showAlert &&
                    <Alert bsStyle="warning" id='modal-alert'>
                        Please add at least one item.
                    </Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <SelectionModalButton onClick={this.evaluateInput}/>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SelectionModal;
