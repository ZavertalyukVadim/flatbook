import React, {Component} from 'react';
import './buttons.scss';

const Button = props => {
    const {children, name, size, className, onClick, disabled} = props;

    return (
        <button className={`btn-default ${size} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >{children}</button>
    );
};
Button.propTypes = {
    children: React.PropTypes.string,
    size: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
};

Button.defaultProps = {
    className: '',
    size: '',
    disabled: false,
    children: ''
};

export default Button;
