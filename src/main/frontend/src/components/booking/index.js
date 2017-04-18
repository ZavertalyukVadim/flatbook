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
            to: moment().add(5, 'days')
        };
    }

    openModal = () => this.setState({isModalOpen: true});
    closeModal = () => this.setState({isModalOpen: false});
    saveStartDate = d => this.setState({from: d});
    saveEndDate = d => this.setState({to: d});
    onSubmit = () => this.props.requestABook({
        announcementsId: this.state.announcementsId,
        from: this.state.from.utc().format(),
        to: this.state.to.utc().format()
    });
    render() {
        console.log(this.state.from.utc().format(), this.state.to.utc().format());
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