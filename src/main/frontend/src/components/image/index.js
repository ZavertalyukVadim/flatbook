import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import './image.scss';

export const ImageSizes = {
    small: 'img-small',
    medium:'img-medium',
    large: 'img-large'
};

class Image extends Component {
    handleClick = () => this.props.onLike();

    render() {
        const {size, src} = this.props;
        const likeClassName = classNames('like', {
            liked: this.props.liked
        });

        return (
            <div className="image-wrapper">
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
    src: PropTypes.string,
    liked: PropTypes.bool,
    onLike: PropTypes.func
};

Image.defaultProps = {
    size: ImageSizes.medium,
    src: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg'
};

export default Image;
