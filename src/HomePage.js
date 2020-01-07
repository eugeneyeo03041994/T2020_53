import React from 'react';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            someValue: 300
        }
    }
    render() {
        return (
            <div className="ui container">
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
        );
    }
}

export default HomePage;
