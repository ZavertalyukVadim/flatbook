import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './navbar.scss';
import {connect} from "react-redux";
import {signout} from "../../actions/user-actions";

class Navbar extends Component {

    render() {
        const {auth, signout} = this.props;

        return (
            <div className="navbar">
                <Link to="/" className="navbar-logo">
                    <img className="navbar-logo-img" src="https://files.slack.com/files-pri/T2EJRA9N0-F52A69K43/logo.png"/>
                </Link>
                {
                    auth.logged ?
                        <div className="navbar-links">
                            <Link to="/profile" className="navbar-link">
                                <span>Profile</span>
                                <i className="fa fa-user-circle-o navbar-link-icon"/>
                            </Link>
                            <div className="navbar-link" onClick={signout}>
                                <span>Sign out</span>
                                <i className="fa fa-sign-out navbar-link-icon"/>
                            </div>
                        </div>
                        :
                        <div className="navbar-links">
                            <Link to="/signin" className="navbar-link">
                                <span>Sign in</span>
                                <i className="fa fa-sign-in navbar-link-icon"/>
                            </Link>
                            <Link to="/signup" className="navbar-link">
                                <span>Sign up</span>
                                <i className="fa fa-user-plus navbar-link-icon"/>
                            </Link>
                        </div>
                }
            </div>
        );
    }
}

export default connect(
    ({user: {auth}}) => ({
        auth: auth
    }), {
        signout
    })(Navbar);
