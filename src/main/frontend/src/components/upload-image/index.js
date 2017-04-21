import React, {Component} from 'react';
import {connect} from "react-redux";
import './uploud-image.scss';
import {noop} from "lodash";

class UploadImage extends Component {

    componentWillReceiveProps(nextProps) {
        if(this.props.uploadedImageId !== nextProps.uploadedImageId){
            this.props.newImageCallback(nextProps.uploadedImageId)
        }

        if(this.props.uploadedAvatarId !== nextProps.uploadedAvatarId){
            this.props.newAvatarCallback(nextProps.uploadedAvatarId)
        }
    }

    saveImage = e => {
        e.preventDefault();
        const file = new FormData();

        file.append("image", e.target.files[0]);
        this.props.saveImage(file)
    };

    render() {
        return (
            <label className="upload-image">
                <div className="upload-image-button">{this.props.caption}</div>
                <input type="file" onChange={this.saveImage}/>
            </label>
        );
    }
}

UploadImage.defaultProps = {
    caption: 'Choose file',
    newImageCallback: noop,
    newAvatarCallback: noop
};

export default connect(
    ({image}) => ({
        uploadedImageId: image.uploadedImageId,
        uploadedAvatarId: image.uploadedAvatarId
    })
)(UploadImage);
