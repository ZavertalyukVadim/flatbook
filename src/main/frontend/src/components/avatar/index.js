import React, {PropTypes} from 'react';
import './avatar.scss';
const Avatar = props => {
    const {src} = props;

    return (
        <img className="img-circled" src={src}/>
    );
};

Avatar.propTypes = {
    src: PropTypes.string
};
Avatar.defaultProps = {
    src: 'http://wowawards.ru/public/img/judge_noimg.jpg'
};
export default Avatar;
