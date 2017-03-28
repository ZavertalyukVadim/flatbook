import React, {Component} from 'react';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Textarea from '../textarea';
import {noop} from 'lodash';
import './comment.scss';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    onInputChange = e => this.setState({value: e.target.value});

    render() {
        return (
            <div className="comment">
                <Textarea
                    placeholder="Leave your comment..."
                    onChange={this.onInputChange}
                    value={this.state.value}
                />
                <Button
                    className="btn-submit"
                    type={ButtonTypes.info}
                    size={ButtonSizes.medium}
                    caption="Submit"
                    onClick={noop}
                />
            </div>
        );
    }
}

export default Comment;
