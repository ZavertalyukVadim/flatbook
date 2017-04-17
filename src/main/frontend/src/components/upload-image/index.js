import React, {Component} from 'react';
import {connect} from "react-redux";
import {uploadImage} from "../../actions/image-actions";
import './uploud-image.scss';
import {noop} from "lodash";

class UploadImage extends Component {

    componentWillReceiveProps(nextProps) {
        if(this.props.imageId !== nextProps.imageId){
            this.props.newImageCallback(nextProps.imageId)
        }
    }

    saveImage = e => {
        e.preventDefault();
        const file = new FormData();

        file.append("image", e.target.files[0]);
        this.props.uploadImage(file, this.props.type)
    };

    render() {
        return (
            <label className="upload-image">
                <span>{this.props.caption}</span>
                <input type="file" onChange={this.saveImage}/>
            </label>
        );
    }
}

UploadImage.defaultProps = {
    caption: 'Choose file',
    newImageCallback: noop
};

export default connect(
    ({image}) => ({
        imageId: image.uploadedImageId
    }), {
        uploadImage
    }
)(UploadImage);
