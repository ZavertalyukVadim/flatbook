import React, {PropTypes} from 'react';
import './avatar.scss';

const Avatar = props => {
    const {src, firstName, lastName} = props;

    return (
        <div className="avatar">
            <img className="img-circled" src={src}/>
            <p>{firstName} {lastName}</p>
        </div>
    );
};

Avatar.propTypes = {
    src: PropTypes.string
};

Avatar.defaultProps = {
    src: 'http://wowawards.ru/public/img/judge_noimg.jpg'
};
export default Avatar;
