import React, {Component} from 'react';
import Price, {PriceTypes} from '../../price';
import Carousel from '../../carousel';
import Image from '../../image';
import Header, {HeaderTypes} from '../../header';
import './announcement-preview.scss';

class AnnouncementPreview extends Component {

    render() {
        const {
            description,
            photos,
            pricePerDay,
            pricePerMonth,
            title
        } = this.props;

        return (
            <div className="announcement-preview">
                {photos.length > 1 ? <Carousel slides={photos}/> : <Image src={photos[0]}/> ||  <Image/>}
                <div className="announcement-description-field">
                    <div className="announcement-description">
                        {title && <Header value={title} type={HeaderTypes.secondary}/>}
                        {pricePerMonth && <Price payment={PriceTypes.monthly} className="price-per-month" value={pricePerMonth}/>}
                        {pricePerDay && <Price payment={PriceTypes.daily} value={pricePerDay}/>}
                        <p className="description-field">{description}</p>

                    </div>
                </div>
            </div>
        )
    }
}

export default  AnnouncementPreview;
