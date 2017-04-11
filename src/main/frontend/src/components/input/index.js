import React, {PropTypes} from 'react';
import './input.scss';

export const inputValidationStateTypes = {
    default: 'default',
    error: 'error',
    success: 'success'
};

const Input = props => {
    const {
        placeholder,
        type,
        disabled,
        onChange,
        value,
        validationState,
        errorMessage,
        name,
        className,
        maxLength
    } = props;

    return (
        <div className={`input-container ${className}`}>
            <input
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                onChange={onChange}
                value={value}
                className={`input input-${validationState}`}
                name={name}
                maxLength={maxLength}
            />
            {errorMessage ? <span className="error-massage">{errorMessage}</span> : null}
        </div>
    );
};

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    validationState: PropTypes.oneOf(Object.values(inputValidationStateTypes)),
    errorMessage: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string
};

Input.defaultProps = {
    placeholder: 'input',
    type: 'text',
    disabled: false,
    validationState: 'default',
    value: '',
    errorMessage: '',
    name: '',
    className: '',
    maxLength: 100
};

export default Input;
