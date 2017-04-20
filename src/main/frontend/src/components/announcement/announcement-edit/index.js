import React, {Component} from 'react';
import {connect} from 'react-redux';
import AnnouncementForm from '../announcement-form';
import Loader from '../../loader';
import {getAnnouncementById, updateAnnouncement} from '../../../actions/announcement-actions';
import {redirect} from '../../../utils/history';

class AnnouncementEdit extends Component {

    componentDidMount() {
        this.props.getAnnouncementById(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.uploaded.data !== nextProps.uploaded.data) {
            redirect(`/announcement/${nextProps.uploaded.data.id}`)
        }
    }

    onSave = d => this.props.updateAnnouncement({...d, announcementId: this.props.id});

    render() {

        const {
            description,
            pricePerDay,
            pricePerMonth,
            title,
            rooms,
            street,
            livingPlaces,
            photos,
            country,
            region,
            city,
            amenities
        } = this.props.announcement.data;

        if(!this.props.announcement.loaded){
            return <Loader/>
        }

        return (
            <AnnouncementForm
                onSave={this.onSave}
                description={description}
                PRICE_PER_DAY={pricePerDay}
                PRICE_PER_MONTH={pricePerMonth}
                chosenAmenities={amenities}
                title={title}
                street={street}
                rooms={rooms}
                livingPlaces={livingPlaces}
                photos={photos}
                chosenCountryID={country.id}
                chosenRegionID={region.id}
                chosenCityID={city.id}
            />
        )
    }
}

export default connect(
    ({
         announcements: {
             announcementView,
             uploaded
         }
     }) => ({
        announcement: announcementView,
        uploaded: uploaded
    }), {
        updateAnnouncement,
        getAnnouncementById
    })(AnnouncementEdit);
