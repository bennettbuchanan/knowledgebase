import React, { Component } from 'react';
import { Alert, Grid } from 'react-bootstrap/lib';
import Header from './Header.jsx';
import List from './userList/List.jsx';
import SelectionModal from './selectionModal/SelectionModal.jsx';
import Login from './login/Login.jsx';
import handleModalData from '../util/handleModalData.js';

/**
 * The toplevel application component to render as the root node.
 */
class App extends Component {
    state = {
        showModal: true,
        istUserLoggedIn: false,
        error: null,
        errorMessage: '',
    }

    showError = (err) => {
        this.setState({
            error: err,
            errorMessage: 'Please try again later.',
        });
    }

    handleModalData = (learnTags, shareTags) => {
        handleModalData(learnTags, shareTags, err => {
            if (err) {
                this.setState({
                    error: err,
                    errorMessage: 'Please try again later.',
                });
            }
            this.setState({ showModal: false });
        });
    }

    onLogin = (err) => {
        this.setState({ istUserLoggedIn: true });
    }

    getContent() {
        const { error, errorMessage, istUserLoggedIn, showModal } = this.state;
        if (error) {
            return (
                <Grid>
                    <Alert bsStyle="danger">
                        <h3>Internal Error.</h3>
                        <p>{errorMessage}</p>
                        <small>{`${error}`}</small>
                    </Alert>
                </Grid>
            )
        }
        if (!istUserLoggedIn) {
            return (<Login onLogin={this.onLogin}/>)
        }
        if (showModal) {
            return (<SelectionModal onClose={this.handleModalData}/>)
        }
        return (<List errorHandler={this.showError}/>)
    }

    render() {
        const { istUserLoggedIn } = this.state;
        return (
            <div>
                <Header isLoginView={!istUserLoggedIn}/>
                {this.getContent()}
            </div>
        )
    }
}

export default App;
