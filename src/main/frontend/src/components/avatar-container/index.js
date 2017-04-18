import React, {Component} from 'react';
import Avatar from '../avatar';
import UploadImage from '../upload-image';
import {connect} from "react-redux";
import {getUserAvatar} from "../../actions/user-actions";
import urlResolver from "../../api/urlResolver";
import {uploadAvatar} from "../../actions/image-actions";

class AvatarContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: {}
        };
    }

    componentDidMount() {
        this.props.getUserAvatar();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.avatar !== this.props.avatar) {
            this.setState({avatar: nextProps.avatar});
        }
    }

    updateAvatar = id => this.setState({avatar: {id: id}});

    render() {
        const {firstName, lastName, view} = this.props;
        const {avatar} = this.state;

        const url = avatar.id ?
            urlResolver(`profile/photo/${avatar.id}`) : 'http://wowawards.ru/public/img/judge_noimg.jpg';

        return (
            <div>
                <Avatar
                    src={url}
                />
                <p>{firstName} {lastName}</p>
                {!view ? <UploadImage
                    caption="Add Photo"
                    newAvatarCallback={this.updateAvatar}
                    saveImage={this.props.uploadAvatar}
                /> : null}
            </div>
        );
    }
}

AvatarContainer.defaultProps = {
    view: false
};

export default connect(
    ({
         user: {avatar}
     }) => ({
        avatar: avatar
    }), {
        getUserAvatar,
        uploadAvatar
    }
)(AvatarContainer);
