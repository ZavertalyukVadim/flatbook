import React  from 'react';
import DatePickerRange from '../../datepicker-range';
import moment from 'moment';
import {Link} from 'react-router-dom';

const BookingView = props => {
    const {from, to, announcementsId} = props;
    console.log(moment());
    return (
        <div className="booking-view">
            {/*<DatePickerRange*/}
                {/*startDate={from}*/}
                {/*endDate={to}*/}
            {/*/>*/}
            <Link to={`/announcement/${announcementsId}`}>
                <div>Show announcement details...</div>
            </Link>
        </div>
    );
};

export default BookingView;
