import React, {Component} from 'react';
import Price, {PriceTypes} from '../../price';
import Avatar from '../../avatar';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import Header, {HeaderTypes} from '../../header';
import AnnouncementPhotoContainer from '../announcement-photo-container';
import './announcement-view.scss';

class AnnouncementView extends Component {

    render() {
        console.log(this.props.data);
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
            amenities
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
                        <Button
                            type={ButtonTypes.primary}
                            size={ButtonSizes.large}
                            caption="Request a book"
                        />
                    </div>

                </div>
                <div className="description-field">
                    <Avatar/>
                    <p>{description}</p>
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
