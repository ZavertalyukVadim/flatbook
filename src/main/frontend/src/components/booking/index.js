import React, {Component} from 'react';
import Button, {ButtonSizes, ButtonTypes} from '../button';
import moment from 'moment';
import {connect} from 'react-redux';
import {requestABook} from '../../actions/announcement-actions';
import DatePickerRange from '../datepicker-range';
import Modal from '../modal';

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
    onSubmit = () => this.props.requestABook({
        announcement_id: this.state.announcementsId,
        fromDate: this.state.from.format('D'),
        fromMonth: this.state.from.format('M'),
        fromYear: this.state.from.format('YYYY'),
        toDate: this.state.to.format('D'),
        toMonth: this.state.from.format('M'),
        toYear: this.state.from.format('YYYY')

    });
    render() {
        console.log(this.state.from.format('YYYY'), this.state.from.format('D'));
        return (
            <div>
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.large}
                    onClick={this.openModal}
                    caption="Request a book"
                />
                <Modal
                    isOpen={this.state.isModalOpen}
                    close={this.closeModal}
                >
                    <DatePickerRange
                        startDate={this.state.from}
                        endDate={this.state.to}
                        handleChangeStart={this.saveStartDate}
                        handleChangeEnd={this.saveEndDate}
                    />
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.large}
                        onClick={this.onSubmit}
                        caption="Request a book"
                    />
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