import React, {PropTypes} from 'react';
import './input.scss';

const Input = props => {
    const {
        placeholder,
        type,
        disabled,
        onChange,
        value,
        validationState,
        errorMessage
    } = props;

    return (
        <div className="input-container">
            <input
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                onChange={onChange}
                value={value}
                className={`input input-${validationState}`}
            />
            { errorMessage ? <span className="error-massage">{errorMessage}</span> : null}
        </div>
    );
};

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    validationState: PropTypes.oneOf(['default', 'error', 'success']),
    errorMessage: PropTypes.string
};

Input.defaultProps = {
    placeholder: 'input',
    type: 'text',
    disabled: false,
    validationState: 'default',
    value: '',
    errorMessage: ''
};

export default Input;
