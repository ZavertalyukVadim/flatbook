import React, {Component} from 'react';
import Price, {PriceTypes} from '../../price';
import Avatar from '../../avatar';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import Header, {HeaderTypes} from '../../header';
import AnnouncementPhotoContainer from '../announcement-photo-container';
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
            amenities
        } = this.props.data;

        return (
            <div className="announcement-view">
                <AnnouncementPhotoContainer  photos={photos} id={id}/>
                <div className="announcement-description-field">
                    <div className="announcement-description">
                        {title && <Header value={title} type={HeaderTypes.secondary}/>}
                        {pricePerMonth && <Price
                            payment={PriceTypes.monthly}
                            className="price-per-month"
                            value={pricePerMonth}/>}
                        {pricePerDay && <Price
                            payment={PriceTypes.daily}
                            value={pricePerDay}/>}
                        <Button
                            type={ButtonTypes.primary}
                            size={ButtonSizes.large}
                            caption="Request a book"
                        />
                    </div>
                    <div className="description-field">
                        <Avatar/>
                        <p>{description}</p>
                        {amenities.map((item, index) =>
                            <div key={index}>
                                <p>{item.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default  AnnouncementView;
