import React from 'react';
import logo from './logo.svg';

import "semantic-ui-css/semantic.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            someValue: 300
        };
        setTimeout(() => this.setState({someValue: 1000}), 5000);
    }

    render() {
        return (
            <div className="ui container">
                <header>
                    <img src={logo} alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.state.someValue}
                    </a>

                    <MyComponent/>
                </header>
            </div>
        );
    }
}

const MyComponent = () => (
    <h1 className="ui dividing header">
      Hello there
    </h1>
);

export default App;
