import React, {Component, PropTypes} from 'react';
import './input.scss';

class Input extends Component {
    static defaultProps = {
        placeholder: 'input',
        type: 'text',
        disabled: false,
        validationState: 'default',
        value: ''
    };

    render() {
        const {placeholder, type, disabled, onChange, value, validationState} = this.props;

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
    }
}

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    validationState: PropTypes.oneOf(['default', 'error', 'success'])
};

export default Input;
