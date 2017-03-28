import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import './image.scss';

export const ImageSizes = {
    small: 'small',
    medium:'medium',
    large: 'large'
};

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    handleClick = () => this.setState({liked: !this.state.liked});

    render() {
        const {size, src, active} = this.props;
        const likeClassName = classNames('like', {
            liked: this.state.liked
        });

        return (
            <div className='image-wrapper'>
                <img
                    className={`img-rectangle ${size}`}
                    src={src}
                />
                <div className={likeClassName}>
                    <i onClick={this.handleClick} className="like-icon fa fa-heart"/>
                </div>
            </div>
        );
    }
}

Image.propTypes = {
    size: PropTypes.oneOf(Object.values(ImageSizes)),
    src: PropTypes.string
};

Image.defaultProps = {
    size: ImageSizes.medium,
    src: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg'
};

export default Image;
