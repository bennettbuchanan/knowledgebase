import React, { Component } from 'react';
import { Modal, Button, Alert, Glyphicon } from 'react-bootstrap/lib';
import stackExchangeAPI from '../../util/api/stackExchangeAPI';
import SelectionModalTitle from './SelectionModalTitle.jsx';
import SelectionModalGroup from './SelectionModalGroup.jsx';
import SelectionModalButton from './SelectionModalButton.jsx';
import SelectionModalRadioGroup from './SelectionModalRadioGroup.jsx'

class SelectionModal extends Component {
    state = {
        showModal: true,
        showDoneButton: false,
        userActivity: [],
        learnTags: [],
        shareTags: [],
        learnTagsErrorMessage: '',
        shareTagsErrorMessage: '',
        learnTagsLoading: false,
        shareTagsLoading: false,
    };

    onPressKey = (tagCategory) => {
        // Clear any error messages when user begins to input again.
        const stateToSet = {};
        stateToSet[`${tagCategory}ErrorMessage`] = '';
        this.setState(stateToSet);
    }

    onAddTag = (text, tagCategory) => {
        let stateToSet = {};
        stateToSet[`${tagCategory}Loading`] = true;
        this.setState(stateToSet);
        const tag = text.replace(/ +/g, '-');
        stackExchangeAPI.getTag(tag, (err, tag) => {
            stateToSet[`${tagCategory}Loading`] = false;
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
            stateToSet.showDoneButton = true;
            stateToSet[tagCategory] = [tag, ...tags];
            return this.setState(stateToSet);
        });
    }

    onRemoveTag = (index, tagCategory) => {
        const stateToSet = {};
        const tags = this.state[tagCategory];
        stateToSet[tagCategory] = tags.filter((tag, i) => i !== index);
        const { learnTags, shareTags } = this.state;
        // This is the last tag being removed.
        if ((learnTags.length + shareTags.length) === 1) {
            stateToSet.showDoneButton = false;
        }
        this.setState(stateToSet);
    }

    evaluateInput = () => {
        const { learnTags, shareTags } = this.state;
        const { onClose } = this.props;
        this.setState({ showModal: false });
        return onClose(learnTags, shareTags);
    }

    onSelectRadio = (e) => {
        const activity = e.target.name;
        if (activity === 'learnAndShare') {
            return this.setState({ userActivity: ['learn', 'share'] })
        }
        this.setState({ userActivity: [activity] })
    }

    clearAll = () => this.setState({
        userActivity: [],
        learnTags: [],
        shareTags: [],
        learnTagsErrorMessage: '',
        shareTagsErrorMessage: '',
        showDoneButton: false,
    })

    getFirstName = () => this.props.profile.getName().split(' ')[0];

    render() {
        const { showModal, learnTags, shareTags, learnTagsErrorMessage,
            shareTagsErrorMessage, showDoneButton, userActivity } = this.state;

        return (
            <Modal
                show={showModal}
                animation={false}
                backdrop={'static'}
            >
                <Modal.Header>
                    {userActivity.length === 0 ?
                    (<SelectionModalTitle
                        title={`Welcome ${this.getFirstName()}!`}
                    />) :
                    (<Button bsSize="xsmall" onClick={this.clearAll}>
                        <Glyphicon glyph="chevron-left" />
                    </Button>)}
                </Modal.Header>
                <Modal.Body>
                    {userActivity.length === 0 ? (
                        <SelectionModalRadioGroup
                            onClick={this.onSelectRadio}
                        />
                    ) :
                    (<div>
                        {userActivity.includes('learn') &&
                            <SelectionModalGroup
                                label={'What technologies are you learning? ' +
                                    'Please add to list.'}
                                category={'learnTags'}
                                tagList={learnTags}
                                onPressKey={this.onPressKey}
                                onPressEnterLearn={this.onAddTag}
                                onClickTag={this.onRemoveTag}
                                errorMessage={learnTagsErrorMessage}
                                fetchingFromAPI={this.state.learnTagsLoading}
                            />
                        }
                        {userActivity.includes('share') &&
                            <SelectionModalGroup
                                label={'What technologies do you want to ' +
                                    'share? Please add to list.'}
                                category={'shareTags'}
                                tagList={shareTags}
                                onPressKey={this.onPressKey}
                                onPressEnterLearn={this.onAddTag}
                                onClickTag={this.onRemoveTag}
                                errorMessage={shareTagsErrorMessage}
                                fetchingFromAPI={this.state.shareTagsLoading}
                            />
                        }
                    </div>)
                    }
                </Modal.Body>
                {showDoneButton &&
                <Modal.Footer>
                    <SelectionModalButton onClick={this.evaluateInput}/>
                </Modal.Footer>
                }
            </Modal>
        );
    }
}

export default SelectionModal;
