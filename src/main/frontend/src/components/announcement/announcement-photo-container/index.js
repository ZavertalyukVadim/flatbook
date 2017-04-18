import React, {Component} from 'react';
import Image from '../../image';
import Carousel from "../../carousel/index";
import urlResolver from '../../../api/urlResolver';
import {connect} from 'react-redux';
import {addAnnouncementToFavourites, deleteAnnouncementFromFavourites} from '../../../actions/user-actions';
import './announcement-photo-container.scss';

class AnnouncementPhotoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: props.liked
        };
    }

    onLike = () => {
        !this.state.liked ? this.props.deleteAnnouncementFromFavourites(this.props.id) :
            this.props.addAnnouncementToFavourites(this.props.id);
        this.setState({liked: !this.state.liked});
    };

    render() {
        const {
            photos,
            size
        } = this.props;

        return (
            <div className="announcement-photo-container">
                {photos.length > 1 ?
                    <Carousel
                        slides={photos}
                        liked={this.state.liked}
                        onLike={this.onLike}
                        size={size}
                    /> :
                    photos.length ?
                        <Image
                            src={urlResolver(`photo/${photos[0].id}`)}
                            size={size}
                            liked={this.state.liked}
                            onLike={this.onLike}
                        /> :
                        <Image
                            size={size}
                            liked={this.state.liked}
                            onLike={this.onLike}
                        />
                }
            </div>
        );
    }
}

AnnouncementPhotoContainer.defaultProps = {
    liked: false
};

export default connect(({user}) => ({user: user}), {
    addAnnouncementToFavourites,
    deleteAnnouncementFromFavourites
})(AnnouncementPhotoContainer);
