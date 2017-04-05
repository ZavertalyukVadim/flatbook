import React, {Component, PropTypes} from 'react';
import ReactSlider from 'react-slider';
import './slider.scss';

class Slider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sliderValue: props.value
        };
    }

    changeValue = (v) => this.setState({sliderValue: v});

    render() {
        const {
            sliderValue
        } = this.state;
        const {
            from,
            to
        } = this.props;
        const [right, left] = sliderValue;

        return (
            <div className="slider-container">
                <div className="slider-values">
                    Price range:
                    <span className="slider-value">{right}</span>
                    -
                    <span className="slider-value">{left}</span>
                </div>
                <ReactSlider
                    min={from}
                    max={to}
                    value={sliderValue}
                    withBars={true}
                    barClassName="bar"
                    onChange={this.changeValue}
                    onAfterChange={this.props.onSave}
                >
                    <div className="slider-handle"/>
                    <div className="slider-handle"/>
                </ReactSlider>
            </div>
        );
    }
}

Slider.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    onSave: PropTypes.func.isRequired
};

export default Slider;
