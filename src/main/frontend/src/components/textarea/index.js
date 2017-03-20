import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './textarea.scss';

const Textarea = props => {
    const {
        disabled,
        value,
        className,
        onChange,
        placeholder
    } = props;
    const ClassName = classNames('textarea', {
        [className]: className
    });

    return (
        <textarea
            className={ClassName}
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
