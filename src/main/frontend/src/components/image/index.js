import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './image.scss';

const Image = props => {
    const {size, src, shape} = props;
    const ClassName = classNames({
        [size]: true,
        [shape]: true
    });
    return (
        <img
            className={ClassName}
            src={src}
        />
    );
};

Image.propTypes = {
    shape: PropTypes.oneOf(['img-circle', 'img-rectangle']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    src: PropTypes.string
};

export default Image;
