import React, {Component} from 'react';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import CommentView from '../comment-view';
import CommentForm from '../comment-form';
import './comment-container.scss';


class CommentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
    }

    onEditMode = () => this.setState({editMode: !this.state.editMode});
    onDelete = () => this.props.onDelete(this.props.id);

    render() {
        return (
            <div className="comment-container">
                {this.state.editMode ?
                    <div>
                        <span onClick={this.onEditMode}>X</span>
                        <CommentForm {...this.props}/>
                    </div>
                    :
                    <div className="comment-view-container">
                        <CommentView {...this.props}/>
                        <div className="comment-buttons">
                            <Button
                                className="btn-submit"
                                type={ButtonTypes.success}
                                size={ButtonSizes.small}
                                caption="Edit"
                                onClick={this.onEditMode}
                            />
                            <Button
                                className="btn-submit"
                                type={ButtonTypes.danger}
                                size={ButtonSizes.small}
                                caption="Delete"
                                onClick={this.onDelete}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default CommentContainer;
