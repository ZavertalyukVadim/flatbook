import React from 'react';
import Header, {HeaderTypes} from '../header';
import './amenities.scss'

const Amenities = props => {
    const {
        data
    } = props;

    const myAmenities = [
        <li><i className="amenity-icon fa fa-wifi"/>Wi-Fi</li>,
        <li><i className="amenity-icon fa fa-fire"/>Smoking</li>,
        <li><i className="amenity-icon fa fa-television"/>TV</li>,
        <li><i className="amenity-icon fa fa-spoon"/>Kitchen staff</li>,
        <li><i className="amenity-icon fa fa-child"/>Children</li>,
        <li><i className="amenity-icon fa fa-car"/>Parking</li>,
        <li><i className="amenity-icon fa fa-wheelchair"/>For people with disabilities</li>,
        <li><i className="amenity-icon fa fa-pause"/>Lift</li>,
        <li><i className="amenity-icon fa fa-bath"/> Washing machine</li>,
        <li><i className="amenity-icon fa fa-bolt"/>Iron</li>,
        <li><i className="amenity-icon fa fa-binoculars"/> Balcony</li>,
        <li><i className="amenity-icon fa fa-paw"/>Animals</li>
    ];
    return (
        <ul className="amenities-list">

            {data.map((item) => myAmenities[item.id - 1])}
        </ul>
    );
};

export default Amenities;