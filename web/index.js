const React = require('react');
const ReactDOM = require('react-dom');

const styles = {
    app: {
        paddingTop: 40,
        textAlign: 'center',
    },
};

function App() {
    return (
        <div style={styles.app}>
            Welcome!
        </div>
    );
}

const root = document.querySelector('#app');
ReactDOM.render(<App />, root);
