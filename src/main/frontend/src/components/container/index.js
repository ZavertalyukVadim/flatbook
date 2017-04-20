import React from 'react';
import './container.scss';
import Navbar from '../navbar';
import Footer from '../footer';

const Container = ({sidebar, navbar, children, image}) => (
    <div className="container">
        <div className="navbar-wrapper"><Navbar/></div>
        {image && <div className="image-container"><img className="background-image" src={image}/></div>}
        <div className="main-container">

            {sidebar && <div className="sidebar-wrapper">{sidebar}</div>}
            <div className="content-wrapper">
                {children}
            </div>

        </div>
        <div className="footer-wrapper"><Footer/></div>
    </div>
);

export default Container;
