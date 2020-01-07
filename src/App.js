import React from 'react';
import logo from './logo.svg';
import "semantic-ui-css/semantic.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ScrollToTop from "./ScrollToTop";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import SignOutPage from "./SignOutPage";
import PersonalPage from "./PersonalPage";
import NotFoundPage from "./NotFoundPage";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route
                    render={({location}) =>
                        <div style={{height: '100%'}}>
                            <ScrollToTop>
                                <div className="ui top menu">
                                    <div className="item">
                                        <img src={logo}/>
                                    </div>
                                    <a className="item float right">Features</a>
                                    <a className="item">Testimonials</a>
                                    <a className="item">Log in</a>
                                </div>
                                <TransitionGroup className="bg-light">
                                    <CSSTransition
                                        key={location.key}
                                        timeout={300}
                                        classNames="fade"
                                    >
                                        <Switch location={location}>
                                            <Route path="/" exact component={HomePage} />
                                            <Route path="/SignIn" exact component={SignInPage} />
                                            <Route path="/SignOut" component={SignOutPage} />
                                            <Route path="/Personal" exact component={PersonalPage} />
                                            <Route path="/404" component={NotFoundPage} />
                                            <Route path="*" component={NotFoundPage} />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </ScrollToTop>
                        </div>
                    }
                />
            </Router>
        );
    }
}

const MyComponent = () => (
    <h1 className="ui dividing header">
        Hello there
    </h1>
);

export default App;
