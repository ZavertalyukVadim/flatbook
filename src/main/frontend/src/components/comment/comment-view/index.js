import React from 'react';
import Avatar from '../../avatar';
import moment from 'moment';
import './comment-view.scss';

const CommentView = props => {
    const {
        user,
        dateCreate,
        text
    } = props;
    return (
        <div className="comment-view">
            <Avatar firstName={user.firstName} lastName={user.lastName}/>
            <p className="comment-text">{text}</p>
            <span>comment left: {moment(dateCreate).format("DD MMM YYYY hh:mm a")}</span>
        </div>
    );
};
export default CommentView;