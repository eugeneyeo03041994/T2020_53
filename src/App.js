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
            <body>

            <div className="ui container">

                <div className="ui top menu">
                    <div className="item">
                        <img src="/images/logo.png"></img>
                    </div>
                    <a className="item float right">Features</a>
                    <a className="item">Testimonials</a>
                    <a className="item">Log in</a>

                </div>

                <h1 className="ui dividing header header-style">
                    Title here
                    <h2 className="ui sub header">
                        sub title intruduction
                    </h2>
                </h1>
                <header>

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

                </header>
            </div>

            </body>

        );
    }
}

const MyComponent = () => (
    <h1 className="ui dividing header">
      Hello there
    </h1>
);

export default App;
