import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import './image.scss';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    handleClick = () => this.setState({liked: !this.state.liked});

    render() {
        const {size, src} = this.props;
        const likeClassName = classNames('like', {
            liked: this.state.liked
        });
        const imageClassName = classNames('img-rectangle', {
            [size]: true
        });

        return (
            <div className="image">
                <img
                    className={imageClassName}
                    src={src}
                />
                <div className={likeClassName}>
                    <span onClick={this.handleClick} className="like-symbol">&#10084;</span>
                </div>
            </div>
        );
    }
}

Image.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    src: PropTypes.string
};

Image.defaultProps = {
    size: 'medium',
    src: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg'
};

export default Image;
