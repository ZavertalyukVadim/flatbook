import React, {Component}  from 'react';
import Container from '../../../components/container';
import AnnouncementView from '../../../components/announcement/announcement-view';
import {getAnnouncementById, getAnnouncementComments, deleteComment} from '../../../actions/announcement-actions';
import {getUser} from '../../../actions/user-actions';
import Loader from '../../../components/loader';
import CommentForm from '../../../components/comment/comment-form';
import CommentContainer from '../../../components/comment/comment-container';
import CommentView from '../../../components/comment/comment-view';
import {connect} from 'react-redux';
import './announcement-id.scss';

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id

        }
    }

    componentDidMount() {
        this.props.getAnnouncementById(this.state.id);
        this.props.getAnnouncementComments(this.state.id);
        this.props.getUser();
    }

    render() {
        const {loaded, data, comments} = this.props.announcements.announcementView;
        const {user} = this.props;
        return (
            <Container>
                {loaded && this.props.user.loaded ? (
                    <div className="announcement-view-container">
                        <AnnouncementView data={data} currentUser={user.data.id}/>
                        {comments.data.map((item, index) =>
                            user.data.id !== item.user.id ?
                                <CommentView
                                    key={index}
                                    {...item}
                                /> :
                                <CommentContainer
                                    key={index}
                                    {...item}
                                    onDelete={this.props.deleteComment}
                                />
                        )}
                        <CommentForm user={user.data} announcementId={data.id}/>
                    </div>) : (<Loader/>)}

            </Container>

        );
    }
}

export default connect(({user, announcements}) => ({user: user, announcements: announcements}), {
    getAnnouncementById,
    getAnnouncementComments,
    getUser,
    deleteComment
})(Announcement);
