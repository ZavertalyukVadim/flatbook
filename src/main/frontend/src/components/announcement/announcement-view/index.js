import React, {Component} from 'react';
import Price, {PriceTypes} from '../../price';
import AvatarContainer from '../../avatar-container';
import Header, {HeaderTypes} from '../../header';
import AnnouncementPhotoContainer from '../announcement-photo-container';
import Booking from '../../booking';
import './announcement-view.scss';
import ContactOwner from '../../contact-owner';
import Amenities from '../../amenities';

class AnnouncementView extends Component {

    render() {
        const {
            id,
            city,
            liked,
            country,
            region,
            photos,
            description,
            pricePerDay,
            pricePerMonth,
            title,
            amenities,
            livingPlaces,
            rooms,
            street,
            user

        } = this.props.data;
        console.log(user);
        return (
            <div className="announcement-view">
                <div className="announcement-contacts-field">
                    <div className="announcement-images-field">
                        <AnnouncementPhotoContainer photos={photos} id={id} size="img-large" liked={liked}/>
                        {title &&
                        <div className="announcement-header"><Header value={title} type={HeaderTypes.secondary}/>Price: {pricePerMonth && <Price
                            payment={PriceTypes.monthly}
                            className="price-per-month"
                            value={pricePerMonth}/>}
                            {pricePerDay && <Price
                                payment={PriceTypes.daily}
                                value={pricePerDay}/>}</div>}
                    </div>

                    <div className="avatar-announcement-field">
                        <h2>Owner Information</h2>
                        <AvatarContainer firstName={user.firstName} lastName={user.lastName} view={true}/>
                        {user.emails.map((item, i) => <p className="owner-contact-info"><i
                            className="icon-info fa fa-envelope-o"/>{item.content}</p>)}
                        {user.phones.map((item, i) => <p className="owner-contact-info"><i
                            className="icon-info fa fa-phone"/>{item.content}</p>)}
                        <ContactOwner id={id} sender={this.props.currentUser} receiver={user.id}/>
                        <Booking id={id}/>
                    </div>


                </div>

                <div className="announcement-main-info">
                    <div className="announcement-view-description-field">
                        <Header value='Description' type={HeaderTypes.primary}/>
                        <p className="description-content">{description}</p>
                    </div>
                    <div className="announcement-overview">
                        <Header value='Overview' type={HeaderTypes.primary}/>
                        <ul className="announcement-overview-list">
                            <li><i className="fa fa-flag"/> Country: <span className="announcement-view-item">{country.name}</span></li>
                            <li><i className="fa fa-map-signs" /> Region: <span className="announcement-view-item">{region.name}</span></li>
                        <li><i className="fa fa-map-marker"/> City: <span className="announcement-view-item">{city.name}</span></li>
                    <li><i className="fa fa-street-view" /> Street: <span className="announcement-view-item">{street}</span></li>
                <li><i className="fa fa-building-o" /> Rooms: <span className="announcement-view-item">{rooms}</span></li>

        <li><i className="fa fa-bed" /> Living Places: <span className="announcement-view-item">{livingPlaces}</span></li>
    </ul>
    </div>
    </div>

        <div className="amenities-field">
            <Amenities data={amenities}/>
        </div>
    </div>
    )
    }
}

export default  AnnouncementView;
