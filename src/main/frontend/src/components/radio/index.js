import React, {Component, PropTypes} from 'react';
import {noop} from 'lodash';
import classNames from 'classnames';
import './radio.scss';

class Radio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
    }

    radioHoverStart = () => this.setState({hover: true});
    radioHoverEnd = () => this.setState({hover: false});

    render() {
        const {
            value,
            onCheck,
            label,
            disabled
        } = this.props;
        const {hover} = this.state;

        const className = classNames('radio-icon fa', {
            ['fa-circle-o']: !value,
            ['fa-dot-circle-o']: value || hover,
            ['radio-checked']: value,
            ['radio-disabled']: disabled
        });

        return (
            <div className="radio" onClick={disabled ? noop : onCheck}>
                <i
                    className={className}
                    onMouseEnter={disabled ? noop : this.radioHoverStart}
                    onMouseLeave={disabled ? noop : this.radioHoverEnd}
                />
                <label className="radio-label">{label}</label>
            </div>
        );
    }
}

Radio.propTypes = {
    value: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

export default Radio;
