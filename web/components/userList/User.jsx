import React, { Component } from 'react';
import { Grid, Row, Col, Image, Panel, Button, Modal, Alert } from
    'react-bootstrap/lib';
import usersAPI from '../../util/api/usersAPI';

/**
 * The individual user panel which displays the user's information.
 */
class User extends Component {
    state = {
        id: '',
        learning: [],
        sharing: [],
        error: null,
    }

    setUserState(key, isLastUserToLoad) {
        usersAPI[key](this.props.id, (err, data) => {
            if (err) {
                return this.props.errorHandler(err);
            }
            const tech = data.map(t => t.name);
            if (isLastUserToLoad) {
                this.props.onDoneLoading();
            }
            const stateToSet = {};
            stateToSet[key] = tech;
            this.setState(stateToSet);
        });
    }

    componentDidMount() {
        this.setUserState('learning');
        this.setUserState('sharing', this.props.isLastUserToLoad);
    }

    renderTag = (text, i) => {
        return (
            <div
                className={'tag-container'}
                style={{width: 'fit-content'}}
                key={i}
            >
                <div id={'tag-text'}>
                    {text}
                </div>
            </div>
        );
    };

    getPreferencesStyle = (type) => {
        const { learning, sharing } = this.state;
        if (type === 'learning') {
            return { width: sharing.length > 0 ? '50%' : '100%' };
        }
        return { width: learning.length > 0 ? '50%' : '100%' };
    }

    handleShow = () => {
        this.setState({ showModal: true });
    }

    handleClose = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { name, image, email, isUserSignedIn } = this.props;
        const { learning, sharing, showModal } = this.state;

        return (
            <div>
                <Modal show={showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert bsStyle="info" style={{ margin: '0px' }}>
                            Please sign in to send a message to {name}.
                        </Alert>
                    </Modal.Body>
                </Modal>
                <Panel>
                    <div className={'user-image-section'}>
                        <Image
                            src={image}
                            className={'user-image'}
                            circle
                            responsive
                        />
                    {isUserSignedIn ?
                        (<a href={`mailto:${email}`}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '15px',
                                fontSize: '2.7em',
                            }} className="icon-bubbles">
                        </a>) :
                        (<a onClick={this.handleShow}
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '15px',
                                fontSize: '2.7em',
                            }} className="icon-bubbles">
                        </a>)
                    }
                    </div>
                    <div className={'user-content'}>
                        <div className={'user-name-section'}>
                            <h2>{name}</h2>
                        </div>
                        <div className={'user-preferences-section'}>
                        {learning.length > 0 && (
                            <div style={this.getPreferencesStyle('learning')}>
                                <h3>Learning</h3>
                                <div id={'tags'}>
                                    {learning.map(this.renderTag)}
                                </div>
                            </div>
                        )}
                        {sharing.length > 0 && (
                            <div style={this.getPreferencesStyle('sharing')}>
                                <h3>Sharing</h3>
                                <div id={'tags'}>
                                    {sharing.map(this.renderTag)}
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </Panel>
            </div>
        );
    }
}

export default User;
