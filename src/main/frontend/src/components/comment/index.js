import React, {PropTypes, Component} from 'react';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Textarea from '../textarea';
import './comment.scss';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    };

    onInputChange = e => this.setState({value: e.target.value});

    render() {
        return (
            <div>
                <Textarea
                    placeholder="Leave your comment..."
                    onChange={this.onInputChange}
                    value={this.state.value}
                />
                <Button
                    type={ButtonTypes.info}
                    size={ButtonSizes.medium}
                    caption="Submit"
                />
            </div>
        );
    }
}

export default Comment;
