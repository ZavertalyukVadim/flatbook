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

  prevSlide = () => {
    let prevSlide = this.state.counter - 1 < 0 ? this.props.slides.length - 1 : this.state.counter - 1;
    this.setState({
      counter: prevSlide
    })    
  }
  
  nextSlide = () => {
    let nextSlide = this.state.counter + 1 < this.props.slides.length ? this.state.counter + 1 : 0;
    this.setState({
      counter: nextSlide
    })
  }

  renderSlides () {
    return this.props.slides.map((image, index) => {     
      let ClassNames = classNames('carousel__slide', {
        'carousel__slide--shown': index === this.state.counter,
      })      
      return (
      	<div className={ClassNames}>
        	<Image key={index}  src={image}/> 
        </div> 
      )
    })
  }
    render() {   	
        return (
            <div className="carousel-wrapper">
            		<div>{this.renderSlides()}</div>
                <div className="carousel__prev" onClick={this.prevSlide}>◀︎</div>
        				<div className="carousel__next" onClick={this.nextSlide}>▶︎</div>
            </div>
        );
    }
}

export default Carousel;
