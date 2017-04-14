import React from 'react';
import Avatar from '../../avatar';

const CommentView = props => {
    console.log(props);
    const {
        dateCreate,
        text
    } = props;
    return (
        <div className="comment-view">
            <Avatar />
            <p>{text}</p>
            <span>comment left: {dateCreate}</span>
        </div>
    );
};
export default CommentView;