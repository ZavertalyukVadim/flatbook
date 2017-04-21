import React, {Component} from 'react';
import Button, {ButtonSizes, ButtonTypes} from '../button';
import moment from 'moment';
import {connect} from 'react-redux';
import {requestABook} from '../../actions/announcement-actions';
import DatePickerRange from '../datepicker-range';
import Modal from '../modal';
import Header, {HeaderTypes} from '../header';
import './booking.scss';

class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            announcementsId: props.id,
            from: moment(),
            to: moment().add(5, 'days'),
            isModalOpen: false
        };
    }

    openModal = () => this.setState({isModalOpen: true});
    closeModal = () => this.setState({isModalOpen: false});
    saveStartDate = d => this.setState({from: d});
    saveEndDate = d => this.setState({to: d});
    onSubmit = () => {
        this.props.requestABook({
            announcement_id: this.state.announcementsId,
            fromDate: this.state.from.format('D'),
            fromMonth: this.state.from.format('M'),
            fromYear: this.state.from.format('YYYY'),
            toDate: this.state.to.format('D'),
            toMonth: this.state.from.format('M'),
            toYear: this.state.from.format('YYYY')

        });
        this.setState({isModalOpen: false})
    };

    render() {
        return (
            <div>
                <Button
                    type={ButtonTypes.success}
                    size={ButtonSizes.block}
                    onClick={this.openModal}
                    caption="Request a book"
                />
                <Modal
                    isOpen={this.state.isModalOpen}
                    close={this.closeModal}
                >
                    <div className="booking-request-field">
                        <Header type={HeaderTypes.primary} value="Request a book"/>
                        <DatePickerRange
                            startDate={this.state.from}
                            endDate={this.state.to}
                            handleChangeStart={this.saveStartDate}
                            handleChangeEnd={this.saveEndDate}
                        />
                        <Button
                            type={ButtonTypes.success}
                            size={ButtonSizes.large}
                            onClick={this.onSubmit}
                            caption="Request a book"
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(
    ({announcements: {announcements}}) => ({
        announcements: {...announcements}
    }), {
        requestABook
    })(Booking);