import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import './carousel.scss';
import Image from '../image';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    prevSlide = () => this.setState({
        counter: this.state.counter - 1 < 0 ? this.props.slides.length - 1 : this.state.counter - 1
    });

    nextSlide = () => this.setState({
        counter: this.state.counter + 1 < this.props.slides.length ? this.state.counter + 1 : 0
    });

    renderSlides = () => this.props.slides.map((image, index) => {
        const imageClassNames = classNames('carousel-slide', {
            'carousel-slide-shown': index === this.state.counter
        });
        return (
            <div className={imageClassNames}>
                <Image key={index} src={image}/>
            </div>
        );
    });

    render() {
        return (
            <div className="carousel-wrapper">
                {this.renderSlides()}
                <div className="carousel-prev" onClick={this.prevSlide}><i className="fa fa-chevron-left"/></div>
                <div className="carousel-next" onClick={this.nextSlide}><i className="fa fa-chevron-right"/></div>
            </div>
        );
    }
}

Carousel.propTypes = {
    slides: PropTypes.array
};

export default Carousel;
