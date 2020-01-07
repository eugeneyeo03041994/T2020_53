import React from 'react';
import logo from './dbslogo.png';
import "semantic-ui-css/semantic.css";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ScrollToTop from "./ScrollToTop";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import SignOutPage from "./SignOutPage";
import PersonalPage from "./PersonalPage";
import NotFoundPage from "./NotFoundPage";
import {connect} from "react-redux";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route
                    render={({location}) =>
                        <div style={{height: '100%'}}>
                            <ScrollToTop>
                                <div className="ui top menu">
                                    <Link to="/" className="item"><img src={logo} alt="Home"/></Link>
                                    {!!this.props.user && <Link to="/Personal" className="item">Personal</Link>}
                                    {!!this.props.user && <Link to="/SignOut" className="item float right">Log Out</Link>}
                                    {!this.props.user && <Link to="/SignIn" className="item float right">Log in</Link>}
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

const mapStateToProps = (state) => ({
    user: state.appState.user
});

export default connect(mapStateToProps)(App);
