import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import './carousel.scss';
import Image, {ImageSizes} from '../image';
import urlResolver from '../../api/urlResolver';

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

    renderSlides = () => this.props.slides.map((obj, index) => {

        const imageClassNames = classNames('carousel-slide',{
            'carousel-slide-shown': index === this.state.counter
        });

        return (
            <div  key={index} className={imageClassNames}>
                <Image src={urlResolver(`photo/${obj.id}`)} liked={this.props.liked} onLike={this.props.onLike} size={this.props.size}/>
            </div>
        );
    });

    render() {
        const wrapperClassNames = classNames('carousel-wrapper',{
            'carousel-medium': this.props.size === 'img-medium',
            'carousel-large': this.props.size === 'img-large'
        });
        return (
            <div className={wrapperClassNames}>
                {this.renderSlides()}
                <div className="carousel-prev" onClick={this.prevSlide}><i className="fa fa-chevron-left"/></div>
                <div className="carousel-next" onClick={this.nextSlide}><i className="fa fa-chevron-right"/></div>
            </div>
        );
    }
}

Carousel.propTypes = {
    slides: PropTypes.array,
    liked: PropTypes.bool,
    onLike: PropTypes.func
};

export default Carousel;
