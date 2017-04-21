import React, {Component} from 'react';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import Textarea from '../../textarea';
import {connect} from 'react-redux';
import AvatarContainer from '../../avatar-container';
import {addNewComment, updateExistingComment} from '../../../actions/announcement-actions';
import './comment.scss';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            announcement_id: props.announcementId,
            text: props.text,
            user: props.user,
            comment_id: props.id
        };
    }

    onInputChange = e => this.setState({text: e.target.value});
    onAddNewComment = () => {
        this.props.id ?
            this.props.updateExistingComment(this.state) : this.props.addNewComment(this.state);
        this.setState({text: ''});
        this.props.close();

    };

    render() {
        const {user} = this.props;
        console.log(this.props);
        return (
            <div className="comment">
                <div className="comment-avatar-field">
                <AvatarContainer firstName={user.firstName} lastName={user.lastName} view={true}/></div>
                <Textarea
                    placeholder="Leave your comment..."
                    onChange={this.onInputChange}
                    value={this.state.text}
                />
                <Button
                    className="btn-submit"
                    type={ButtonTypes.primary}
                    size={ButtonSizes.medium}
                    caption="Submit"
                    onClick={this.onAddNewComment}
                />
            </div>
        );
    }
}

CommentForm.defaultProps = {
    text: ''
};

export default connect(({announcements}) => ({announcements: announcements}), {
    addNewComment,
    updateExistingComment
})(CommentForm);
