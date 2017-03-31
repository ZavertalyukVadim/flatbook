import React from 'react';
import './container.scss';

const Container = props => {
    return (
        <div className="main-container">
            {props.sidebar ? <div className="sidebar-wrapper">{props.sidebar}</div> : false}
            <div className="content-wrapper">
                {props.children}
            </div>
        </div>
    );
};

export default Container;
