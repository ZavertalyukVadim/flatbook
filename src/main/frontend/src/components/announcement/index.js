import React, {Component} from 'react';
import Checkbox from '../checkbox';
import Price, {PriceTypes} from '../price';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Carousel from '../carousel';
import Image from '../image';
import Header, {HeaderTypes} from '../header';
import './announcement.scss';

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            visibility: props.visibility,
            description: props.description,
            photos: props.photos,
            pricePerDay: props.pricePerDay,
            pricePerMonth: props.pricePerMonth
        }
    }

    onCheckboxClick = () => this.setState({visibility: !this.state.visibility});

    render() {
        const {
            description,
            photos,
            pricePerDay,
            pricePerMonth,
            title,
            visibility
        } = this.state;

        return (
            <div className="announcement-item">
                {photos.length > 1 ? <Carousel slides={photos}/> : <Image src={photos[0]}/>}
                <div className="announcement-description-field">
                    <div className="announcement-description">
                        {title && <Header value={title} type={HeaderTypes.secondary}/>}
                        {pricePerMonth && <Price payment={PriceTypes.monthly} className="price-per-month" value={pricePerMonth}/>}
                        {pricePerDay && <Price payment={PriceTypes.daily} value={pricePerDay}/>}                   
                        <p className="description-field">{description}</p>

                    </div>
                    <div className="announcement-buttons">
                    <Checkbox
                        className="hide-announcement"
                        onClick={this.onCheckboxClick}
                        checked={visibility}
                        disabled={false}
                    >Hide</Checkbox>

                
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.small}
                        caption="Edit"

                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.small}
                        caption="Delete"
                    />
                   
                </div>
                </div>
                
            </div>
        )
    }
}


export default  Announcement;
