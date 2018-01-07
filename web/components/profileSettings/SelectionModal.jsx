import async from 'async';
import React, { Component } from 'react';
import { Modal, Button, Alert, Glyphicon } from 'react-bootstrap/lib';
import stackExchangeAPI from '../../util/api/stackExchangeAPI';
import usersAPI from '../../util/api/usersAPI';
import SelectionModalTitle from './../selectionModal/SelectionModalTitle.jsx';
import SelectionModalGroup from './../selectionModal/SelectionModalGroup.jsx';
import SelectionModalButton from './../selectionModal/SelectionModalButton.jsx';
import SelectionModalRadioGroup from
    './../selectionModal/SelectionModalRadioGroup.jsx'

class SelectionModal extends Component {
    state = {
        showModal: true,
        showDoneButton: true,
        preexistingLearnTags: [],
        preexistingShareTags: [],
        learnTags: [],
        shareTags: [],
        learnTagsErrorMessage: '',
        shareTagsErrorMessage: '',
        learnTagsLoading: false,
        shareTagsLoading: false,
        userId: null,
    };

    setPreexistingTags = () => {
        const { profile } = this.props;
        let userId;

        async.series([
            next => usersAPI.getUserId(profile.getEmail(), (err, id) => {
                if (err) {
                    return next(err);
                }
                userId = id;
                return next();
            }),
            next => usersAPI.learning(userId, next),
            next => usersAPI.sharing(userId, next),
        ], (err, data) => {
            if (err) {
                this.props.errorHandler(err);
            }
            this.setState({
                learnTags: data[1].map(o => o.name),
                shareTags: data[2].map(o => o.name),
                preexistingLearnTags: data[1].map(o => o.name),
                preexistingShareTags: data[2].map(o => o.name),
                userId,
            });
        });
    }

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
        const tags = {
            preexistingLearnTags: this.state.preexistingLearnTags,
            preexistingShareTags: this.state.preexistingShareTags,
            learnTags: this.state.learnTags,
            shareTags: this.state.shareTags,
        };
        this.props.onClose(tags, this.state.userId, () =>
            this.setState({ showModal: false }));
    }

    getFirstName = () => this.props.profile.getName().split(' ')[0];

    componentWillMount() {
        this.setPreexistingTags()
    }

    render() {
        const { showModal, learnTags, shareTags, learnTagsErrorMessage,
            shareTagsErrorMessage, showDoneButton } = this.state;

        return (
            <Modal
                show={showModal}
                animation={false}
            >
                <Modal.Header>
                    <SelectionModalTitle
                        title={`${this.getFirstName()}'s profile`}
                    />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <SelectionModalGroup
                            label={'What technologies are you learning?'}
                            category={'learnTags'}
                            tagList={learnTags}
                            onPressKey={this.onPressKey}
                            onPressEnterLearn={this.onAddTag}
                            onClickTag={this.onRemoveTag}
                            errorMessage={learnTagsErrorMessage}
                            fetchingFromAPI={this.state.learnTagsLoading}
                        />
                        <SelectionModalGroup
                            label={'What technologies do you want to share?'}
                            category={'shareTags'}
                            tagList={shareTags}
                            onPressKey={this.onPressKey}
                            onPressEnterLearn={this.onAddTag}
                            onClickTag={this.onRemoveTag}
                            errorMessage={shareTagsErrorMessage}
                            fetchingFromAPI={this.state.shareTagsLoading}
                        />
                    </div>
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
