import React, {PropTypes} from 'react';
import './container.scss';
import Navbar from '../navbar';

const Container = ({sidebar, navbar, footer, children}) => (
		<div>
		<div className="navbar-wrapper"><Navbar/></div>
        <div className="main-container">
            
            {sidebar && <div className="sidebar-wrapper">{sidebar}</div>}
            <div className="content-wrapper">
                {children}
            </div>
            {footer && <div className="footer-wrapper">{footer}</div>}
        </div>
        </div>
    );

export default Container;
