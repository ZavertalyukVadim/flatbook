import React, {Component} from 'react';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import Textarea from '../../textarea';
import './comment.scss';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            announcement_id: props.announcementId,
            text: '',
            user: props.user
        };
    }

    onInputChange = e => this.setState({text: e.target.value});
    onAddNewComment = () => this.props.add(this.state);

    render() {
        console.log(this.props);
        return (
            <div className="comment">
                <Textarea
                    placeholder="Leave your comment..."
                    onChange={this.onInputChange}
                    value={this.state.text}
                />
                <Button
                    className="btn-submit"
                    type={ButtonTypes.info}
                    size={ButtonSizes.medium}
                    caption="Submit"
                    onClick={this.onAddNewComment}
                />
            </div>
        );
    }
}

export default CommentForm;
