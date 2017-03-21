import React, {PropTypes} from 'react';
import './textarea.scss';

const Textarea = props => {
    const {
        disabled,
        value,
        className,
        onChange,
        placeholder
    } = props;

    return (
        <textarea
            className={`textarea ${className}`}
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

Textarea.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

Textarea.defaultProps = {
    disabled: false,
    value: '',
    className: '',
    placeholder: 'Enter your text here...'
};

export default Textarea;
