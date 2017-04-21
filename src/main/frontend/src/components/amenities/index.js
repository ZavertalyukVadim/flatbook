import React from 'react';
import Header, {HeaderTypes} from '../header';
import './amenities.scss'

const Amenities = props => {
    const {
        data
    } = props;

    const myAmenities = [
        <li><i className="fa fa-wifi"/>Wi-Fi</li>,
        <li><i className="fa fa-fire"/>Smoking</li>,
        <li><i className="fa fa-television"/>TV</li>,
        <li><i className="fa fa-spoon"/>Kitchen staff</li>,
        <li><i className="fa fa-child"/>Children</li>,
        <li><i className="fa fa-car"/>Parking</li>,
        <li><i className="fa fa-wheelchair"/>For people with disabilities</li>,
        <li><i className="fa fa-pause"/>Lift</li>,
        <li><i className="fa fa-bath"/> Washing machine</li>,
        <li><i className="fa fa-bolt"/>Iron</li>,
        <li><i className="fa fa-binoculars"/> Balcony</li>,
        <li><i className="fa fa-paw"/>Animals</li>
    ];
    return (
        <ul className="amenities-list">
            <Header type={HeaderTypes.primary} value='Amenities'/>
            {data.map((item) => myAmenities[item.id - 1])}
        </ul>
    );
};

export default Amenities;