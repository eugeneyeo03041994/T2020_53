import React from "react";
import AppRedux from "./redux";

class SignInPage extends React.Component {
    componentDidMount() {
        AppRedux.dispatch({type: "setUser", user: "marytan"})
    }

    render() {
        return (
            <div className="ui container">
                <h1>Sign In</h1>
                <div>
                    <div className="ui input">
                        <input type="text" placeholder="Search..."/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInPage;
