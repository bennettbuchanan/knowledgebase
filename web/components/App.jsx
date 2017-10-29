import React, { Component } from 'react';
// import { Alert } from 'react-bootstrap/lib';
import Header from './Header.jsx';
import Listing from './Listing.jsx';

/**
 * The toplevel application component to render as the root node.
 */
class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Listing />
            </div>
        )
    }
}

export default App;
