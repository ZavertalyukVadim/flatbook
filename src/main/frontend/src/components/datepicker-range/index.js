import React, {PropTypes} from 'react';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import './datepicker-range';

const DatePickerRange = props => {
    const {
        startDate,
        endDate,
        handleChangeStart,
        handleChangeEnd
    } = props;

    const changeStart = d => {
        if (d.isBefore(endDate) || d.isSame(endDate)) {
            handleChangeStart(d);
        } else {
            handleChangeStart(endDate);
            handleChangeEnd(d);
        }
    };
    const changeEng = d => {
        if (d.isAfter(startDate) || d.isSame(startDate)) {
            handleChangeEnd(d);
        } else {
            handleChangeStart(d);
        }
    };

    return (
        <div className="datepicker-range">
            <div className="datepicker-range-item">
                <span className="datepicker-range-label">Check-in</span>
                <DatePicker
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={changeStart}
                    locale="en-gb"
                    minDate={moment()}
                />
            </div>
            <div className="datepicker-range-item">
                <span className="datepicker-range-item">Check-out</span>
                <DatePicker
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    onChange={changeEng}
                    locale="en-gb"
                    minDate={moment()}
                />
            </div>
        </div>
    )
};

DatePickerRange.propTypes = {
    startDate: momentPropTypes.momentObj,
    endDate: momentPropTypes.momentObj,
    handleChangeStart: PropTypes.func,
    handleChangeEnd: PropTypes.func
};

export default DatePickerRange;
