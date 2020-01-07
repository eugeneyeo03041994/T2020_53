import React from "react";
import AppRedux from "./redux";
import {connect} from "react-redux";

export const USERS = {
    marytan: {
        age: 28,
        gender: "F"
    },
    limzeyang: {
        age: 20,
        gender: "M"
    },
    ahmadfarhan: {
        age: 26,
        gender: "M"
    }
};

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        if (!!this.props.user) {
            this.props.history.push("/");
        }
    }
    state = {username: "", password: "", error: ""};

    signIn = event => {
        if (event) {
            event.preventDefault();
        }
        if (!!USERS[this.state.username]) {
            AppRedux.dispatch({type: "setUser", user: this.state.username});
            this.props.history.push("/");
        } else {
            this.setState({error: "User does not exist!"});
        }
    };

    render() {
        return (
            <div className="ui container">
                <h1>Sign In</h1>
                <form className="ui form" onSubmit={this.signIn}>
                    <div className="field">
                        <label>Username</label>
                        <input type="text" name="first-name" placeholder="First Name" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="last-name" placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                    </div>
                    <button className="ui button" type="submit">Sign In</button>
                    {!!this.state.error &&
                    <div className="ui negative message">
                        <i className="close icon"/>
                        <div className="header">
                            We're sorry we can't sign in
                        </div>
                        <p>{this.state.error}</p>
                    </div>}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.appState.user
});

export default connect(mapStateToProps)(SignInPage);
