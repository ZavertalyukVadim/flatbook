import React, {PropTypes} from 'react';
import './input.scss';

const Input = props => {
    const {
        placeholder,
        type,
        disabled,
        onChange,
        value,
        validationState
    } = props;

    return (
        <input
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            onChange={onChange}
            value={value}
            className={`input input-${validationState}`}
        />
    );
};

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    validationState: PropTypes.oneOf(['default', 'error', 'success'])
};

Input.defaultProps = {
    placeholder: 'input',
    type: 'text',
    disabled: false,
    validationState: 'default',
    value: ''
};

export default Input;
