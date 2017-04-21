import React, {PropTypes} from 'react';
import './price.scss';

export const PriceTypes = {
    monthly: 'per month',
    daily: 'per day'
};

const Price = props => {
    const {value, payment, className} = props;

    return (
        <p className={`price-payment ${className}`}>{payment}: <span className="price-value">  {value} <i className="price-icon fa fa-usd"/> </span></p>
    );
};

Price.propTypes = {
    value: PropTypes.number,
    payment: PropTypes.oneOf(Object.values(PriceTypes))
};

export default Price;
