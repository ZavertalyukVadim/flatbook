import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './button.scss';

const Button = props => {
    const {
        children,
        className,
        size,
        type,
        onClick,
        disabled
    } = props;
    const ClassName = classNames({
        'btn-default': true,
        'btn-disabled': disabled,
        [size]: true,
        [type]: true,
        [className]: className
    });

    return (
        <button className={ClassName}
                onClick={onClick}
                disabled={disabled}
        >{children}</button>
    );
};

Button.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['btn-info', 'btn-success', 'btn-danger', 'btn-primary', 'btn-disabled']),
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

Button.defaultProps = {
    disabled: false,
    size: 'medium'
};

export default Button;
