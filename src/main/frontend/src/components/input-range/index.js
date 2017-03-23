import React, {PropTypes} from 'react';
import {noop} from 'lodash';
import classNames from 'classnames';
import './input-range.scss';

const InputRange = props => {
    const {
        value,
        onChangeValue,
        maxValue
    } = props;

    const isLeftArrowDisabled = value === 1;
    const isRightArrowDisabled = value === maxValue;
    const onLeftArrowClick = () => onChangeValue(value - 1);
    const onRightArrowClick = () => onChangeValue(value + 1);
    const leftArrowClassName = classNames('arrow', {'arrow-disabled': isLeftArrowDisabled});
    const rightArrowClassName = classNames('arrow', {'arrow-disabled': isRightArrowDisabled});
    const onChangeInput = e => +e.target.value < 0 || +e.target.value > maxValue ? false : onChangeValue(+e.target.value);


    return (
        <div className="input-range">
            <span onClick={isLeftArrowDisabled ? noop : onLeftArrowClick} className={leftArrowClassName} >
                &#60;
            </span>
            <input value={value} onChange={onChangeInput}/>
            <span onClick={isRightArrowDisabled ? noop : onRightArrowClick} className={rightArrowClassName}>
                &#62;
            </span>
        </div>
    );
};

InputRange.propTypes = {
    value: PropTypes.number,
    maxValue: PropTypes.number.isRequired,
    onChangeValue: PropTypes.func.isRequired
};

InputRange.defaultProps = {
    value: 100
};

export default InputRange;
