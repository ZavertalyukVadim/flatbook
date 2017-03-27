import React from 'react';
import './social-icons.scss';

const SocialIcons = () => {

    return (
        <div>
            <p>Follow us:
                <a href ="https://twitter.com/" target="_blank" className="social-icons">
                    <i className="fa fa-twitter"/>
                </a>
                <a href ="https://www.facebook.com/" target="_blank" className="social-icons">
                    <i className="fa fa-facebook"/>
                </a>
            </p>
        </div>
    );
};

export default SocialIcons;
