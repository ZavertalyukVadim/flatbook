import React, {Component, PropTypes} from 'react';
import {noop, isNaN} from 'lodash';
import classNames from 'classnames';
import './input-range.scss';

class InputRange extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            isLeftArrowDisabled: props.value === 1,
            isRightArrowDisabled: props.value === props.maxValue
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
                isLeftArrowDisabled: nextProps.value === 1,
                isRightArrowDisabled: nextProps.value === nextProps.maxValue
            });
        }
    }

    onLeftArrowClick = () => this.props.onChangeValue(this.state.value - 1);
    onRightArrowClick = () => this.props.onChangeValue(this.state.value + 1);
    onInputChange = ({target: {value}}) =>
        !isNaN(+value) && value !== ' ' && +value <= this.props.maxValue && value !== '0' ?
            this.setState({value: value}) : false;
    onInputFocus = () => this.setState({value: ''});
    onInputBlur = () =>
        this.state.value ? this.props.onChangeValue(+this.state.value) : this.setState({value: this.props.value});

    render() {
        const {
            value,
            isLeftArrowDisabled,
            isRightArrowDisabled
        } = this.state;

        const leftArrowClassName = classNames('arrow arrow-left', {'arrow-disabled': isLeftArrowDisabled});
        const rightArrowClassName = classNames('arrow arrow-right', {'arrow-disabled': isRightArrowDisabled});

        return (
            <div className="input-range">
                <span onClick={isLeftArrowDisabled ? noop : this.onLeftArrowClick} className={leftArrowClassName}>
                    <i className="fa fa-angle-left"/>
                </span>
                <input
                    value={value}
                    onChange={this.onInputChange}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                />
                <span onClick={isRightArrowDisabled ? noop : this.onRightArrowClick} className={rightArrowClassName}>
                    <i className="fa fa-angle-right"/>
                </span>
            </div>
        );
    }
}

InputRange.propTypes = {
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    onChangeValue: PropTypes.func.isRequired
};

export default InputRange;
