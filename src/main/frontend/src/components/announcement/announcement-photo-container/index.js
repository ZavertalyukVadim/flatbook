import React, {Component} from 'react';
import Image, {ImageSizes} from '../../image';
import Carousel from "../../carousel/index";
import urlResolver from '../../../api/urlResolver';
import {connect} from 'react-redux';
import {addAnnouncementToFavourites, deleteAnnouncementFromFavourites} from '../../../actions/user-actions';


class AnnouncementPhotoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    onLike = () => {
        this.setState({liked: !this.state.liked});
        console.log(this.state);
        {this.state.liked ? this.props.deleteAnnouncementFromFavourites(this.props.id) : this.props.addAnnouncementToFavourites(this.props.id)}
    };

    render() {
        const {photos} = this.props;

        return (
            <div>
                {photos.length > 1 ? <Carousel slides={photos} liked={this.state.liked} onLike={this.onLike}/> :
                    photos.length ?
                        <Image
                            src={urlResolver(`photo/${photos[0].id}`)}
                            size={ImageSizes.large}
                            liked={this.state.liked}
                            onLike={this.onLike}
                        /> :
                        <Image
                            size={ImageSizes.large}
                            liked={this.state.liked}
                            onLike={this.onLike}
                        />
                }
            </div>
        );
    }
}
;

export default connect(({user}) => ({user: user}), {addAnnouncementToFavourites, deleteAnnouncementFromFavourites})(AnnouncementPhotoContainer);
