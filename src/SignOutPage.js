import React from "react";
import AppRedux from "./redux";

class SignOutPage extends React.Component {
    componentDidMount() {
        AppRedux.dispatch({type: "signOut"});
    }

    render() {
        return (
            <div className="ui container">
                <h1>You have been successfully signed out.</h1>
            </div>
        );
    }
}

export default SignOutPage;
