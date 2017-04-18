import React, {Component} from 'react';
import Price, {PriceTypes} from '../../price';
import AvatarContainer from '../../avatar-container';
import Header, {HeaderTypes} from '../../header';
import AnnouncementPhotoContainer from '../announcement-photo-container';
import Booking from '../../booking';
import './announcement-view.scss';

class AnnouncementView extends Component {

    render() {
        const {
            id,
            city,
            country,
            region,
            photos,
            description,
            pricePerDay,
            pricePerMonth,
            title,
            amenities,
            user
        } = this.props.data;

        return (
            <div className="announcement-view">
                <div className="announcement-description-field">
                    <AnnouncementPhotoContainer  photos={photos} id={id} size="large"/>
                    <div className="announcement-description">
                        {title && <Header value={title} type={HeaderTypes.secondary}/>}
                        {pricePerMonth && <Price
                            payment={PriceTypes.monthly}
                            className="price-per-month"
                            value={pricePerMonth}/>}
                        {pricePerDay && <Price
                            payment={PriceTypes.daily}
                            value={pricePerDay}/>}
                        <p>Country: {country.name}</p>
                        <p>Region: {region.name}</p>
                        <p>City: {city.name}</p>
                        <Booking id={id}/>
                    </div>

                </div>
                <div className="description-field">
                    <AvatarContainer firstName={user.firstName} lastName={user.lastName} view={true}/>
                    <p className="description">{description}</p>
                </div>
                <div className="amenities-field">
                    {amenities.map((item, index) =>
                        <div key={index}>
                            <p>{item.name}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default  AnnouncementView;
