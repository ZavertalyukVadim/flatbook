import React from 'react';
import AvatarContainer from '../../avatar-container';
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
            <AvatarContainer firstName={user.firstName} lastName={user.lastName} view={true}/>
            <p className="comment-text">{text}</p>
            <span>comment left: {moment(dateCreate).format("DD MMM YYYY hh:mm a")}</span>
        </div>
    );
};
export default CommentView;