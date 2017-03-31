import React from 'react';
import './container.scss';

const Container = ({sidebar, navbar, footer, children}) => (
        <div className="main-container">
            {navbar && <div className="navbar-wrapper">{navbar}</div>}
            {sidebar && <div className="sidebar-wrapper">{sidebar}</div>}
            <div className="content-wrapper">
                {children}
            </div>
            {footer && <div className="footer-wrapper">{footer}</div>}
        </div>
    );

export default Container;
