import React, {Component}  from 'react';
import Container from '../../../components/container';
import AnnouncementView from '../../../components/announcement/announcement-view';
import {getAnnouncementById, getAnnouncementComments, addNewComment} from '../../../actions/announcement-actions';
import Loader from '../../../components/loader';
import CommentForm from '../../../components/comment/comment-form';
import CommentView from '../../../components/comment/comment-view';
import {connect} from 'react-redux';

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
    }

    render() {
        const {loaded, data, comments} = this.props.announcements.announcementView;
        console.log(comments);
        return (
            <Container>
                {loaded ? (
                    <div>
                        <AnnouncementView data={data}/>
                        {comments.data.map((item, index) =>
                            <CommentView
                                key={index}
                                {...item}
                            />
                        )}
                        <CommentForm announcementId={data.id} add={this.props.addNewComment}/>
                    </div>) : (<Loader/>)}
            </Container>

        );
    }
}

export default connect(({announcements}) => ({announcements: announcements}), {
    getAnnouncementById,
    getAnnouncementComments,
    addNewComment
})(Announcement);
