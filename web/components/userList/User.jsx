import React, { Component } from 'react';
import { Grid, Row, Col, Image, Panel, Button,
    Glyphicon } from 'react-bootstrap/lib';
import usersAPI from '../../util/api/usersAPI';

/**
 * The individual user panel which displays the user's information.
 */
class User extends Component {
    state = {
        id: '',
        learning: '',
        sharing: '',
        error: null,
    }

    setUserState(key, isLastUserToLoad) {
        usersAPI[key](this.state.id, (err, data) => {
            if (err) {
                return this.props.errorHandler(err);
            }
            const tech = data.map(t => t.name);
            const o = {};
            o[key] = tech.join(', ');
            if (isLastUserToLoad) {
                this.props.onDoneLoading();
            }
            this.setState(o);
        });
    }

    componentDidMount() {
        this.setUserState('learning');
        this.setUserState('sharing', this.props.isLastUserToLoad);
    }

    render() {
        const { id, username } = this.props;
        this.state.id = id;

        return (
            <Panel>
                <div>
                    <Image src="/assets/thumbnail.png" className={'user-image'}
                        circle responsive />
                </div>
                <div className={'user-content'}>
                    <div className={'user-name-section'}>
                        <h1>{username}</h1>
                        <div>
                            <Button bsSize="small">
                                <span className="icon-commenting-o"></span>
                            </Button>
                        </div>
                    </div>
                    <div className={'user-preferences-section'}>
                    {this.state.learning && (
                        <div>
                            <h2>Learning</h2>
                            <p>{this.state.learning}</p>
                        </div>
                    )}
                    {this.state.sharing && (
                        <div>
                            <h2>Sharing</h2>
                            <p>{this.state.sharing}</p>
                        </div>
                    )}
                    </div>
                </div>
            </Panel>
        );
    }
}

export default User;
