import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './button.scss';

export const ButtonTypes = {
    info:'btn-info',
    success:'btn-success',
    danger: 'btn-danger',
    primary:  'btn-primary',
    disabled: 'btn-disabled'
};

export const ButtonSizes = {
    small: 'small',
    medium:'medium',
    large: 'large'
};

const Button = props => {
    const {
        caption,
        className,
        size,
        type,
        onClick,
        disabled
    } = props;
    const ClassName = classNames(`btn-default ${size} ${type}`, {
        'btn-disabled': disabled,
        [className]: className
    });

    return (
        <button className={ClassName}
                onClick={onClick}
                disabled={disabled}
        >{caption}</button>
    );
};

Button.propTypes = {
    size: PropTypes.oneOf(Object.values(ButtonSizes)),
    type: PropTypes.oneOf(Object.values(ButtonTypes)),
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

Button.defaultProps = {
    disabled: false,
    size: ButtonSizes.medium
};

export default Button;
