import React, {Component} from 'react';
import Price, {PriceTypes} from '../../price';
import AnnouncementPhotoContainer from '../announcement-photo-container';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import Header, {HeaderTypes} from '../../header';
import './announcement-preview.scss';

class AnnouncementPreview extends Component {

    render() {
        const {
            id,
            region,
            pricePerDay,
            pricePerMonth,
            title,
            photos,
            liked,
            vertical,
            horisontal,
            description
        } = this.props;
        const ClassName = classNames({
            'announcement-preview-vertical': vertical,
            'announcement-preview-horisontal': horisontal
        });
        return (
            <div className={ClassName}>
                <div className="announcement-photo-field">
                <AnnouncementPhotoContainer photos={photos} id={id} liked={liked} size="img-medium"/>
                    <Link to={`/announcement/${id}`}>
                        <h2 className="announcement-header">{title}</h2>
                    </Link>
                </div>
                <div className="announcement-description-field">
                    <div className="announcement-description">
                        {pricePerMonth && <Price payment={PriceTypes.monthly} className="price-per-month" value={pricePerMonth}/>}
                        {pricePerDay && <Price payment={PriceTypes.daily} value={pricePerDay}/>}
                        <span className="announcement-region"><i className="announcement-region-icon fa fa-map-marker" />{region.name}</span>
                        {horisontal && <p>{description}</p>}
                    </div>
                </div>
            </div>
        )
    }
}

AnnouncementPreview.defaultProps = {
    vertical: false,
    horisontal: false
};

export default  AnnouncementPreview;
