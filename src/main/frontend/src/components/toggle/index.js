import React, {PropTypes} from 'react';
import './toggle.scss';

const Toggle = props => {
    const {
        isToggled,
        changeToggle
    } = props;

    return (
        <div className="toggle">
            <label className="toggle-switch" >
                <input type="checkbox" checked={isToggled} onClick={changeToggle}/>
                <div className="toggle-slider">
                    <span className="toggle-icon-list"><i className="fa fa-th-list"/></span>
                    <span className="toggle-icon-table"><i className="fa fa-th-large"/></span>
                </div>
            </label>
        </div>
    );
};

Toggle.propTypes = {
    isToggled: PropTypes.bool.isRequired,
    changeToggle: PropTypes.func.isRequired
};

export default Toggle;
