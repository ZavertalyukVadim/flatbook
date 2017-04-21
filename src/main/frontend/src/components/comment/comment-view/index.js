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
            <div className="comment-view-avatar-field">
            <AvatarContainer view={true}/></div>
            <div className="comment-info">

                <p className="comment-info-field comment-username">{user.firstName} {user.lastName}</p>
                <p className="comment-info-field"><i className="calendar-icon fa fa-calendar"/> {moment(dateCreate).format("DD MMM YYYY hh:mm a")}</p>
                <p className="comment-info-field comment-text">{text}</p>
            </div>


        </div>
    );
};
export default CommentView;