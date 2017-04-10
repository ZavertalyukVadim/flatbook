import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="navbar-logo">
                <img src="http://spd-university.com/images/logo-header.png"/>
            </Link>

            <div className="navbar-links">
                <Link to="/showroom" className="navbar-link">Showroom</Link>
                <Link to="/signin" className="navbar-link">Sign in</Link>
                <Link to="/signup" className="navbar-link">Sign up</Link>
                <Link to="/profile" className="navbar-link">
                    <span>Profile</span>
                    <i className="fa fa-user-circle-o navbar-link-icon"/>
                </Link>
                <div className="navbar-link">
                    Sign out
                </div>
            </div>
        </div>
    );
};

export default Navbar;
