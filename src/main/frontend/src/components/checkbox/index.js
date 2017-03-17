import React, {PropTypes} from 'react';
import classNames from 'classnames';

import './checkbox.scss';

const Checkbox = props => {
    const {
        checked,
        disabled,
        onClick,
        children
    } = props;
    const className = classNames({
        'checkbox-checked': checked,
        'checkbox-unchecked': !checked,
        'checkbox-disabled': disabled
    });

    return (
        <div className="checkbox" onClick={!disabled ? onClick : _ => _}>
            <span className={className}/>
            <label>{children}</label>
        </div>
    );
};

Checkbox.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.bool
};

Checkbox.defaultProps = {
    checked: false,
    disabled: false
};

export default Checkbox;
