import React, {PropTypes} from 'react';
import './toggle.scss';

const Toggle = props => {
    const {
        isToggled,
        changeToggle,
        icons
    } = props;

    return (
        <div className="toggle">
            <label className="toggle-switch" >
                <input type="checkbox" checked={isToggled} onClick={changeToggle}/>
                <div className="toggle-slider">
                    <span className="toggle-icon">{icons[0]}</span>
                    <span className="toggle-icon">{icons[1]}</span>
                </div>
            </label>
        </div>
    );
};

Toggle.propTypes = {
    isToggled: PropTypes.bool.isRequired,
    changeToggle: PropTypes.func.isRequired,
    icons: PropTypes.array.isRequired
};

export default Toggle;
