import React, {Component} from 'react';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Textarea from '../textarea';
import moment from 'moment';
import {connect} from 'react-redux';
import {sendAMessage} from '../../actions/user-actions';
import Modal from '../modal';

class ContactOwner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            receiverId: props.receiver,
            senderId: props.sender,
            announcementId: props.id,
            content: '',
            localDateTime: moment().utc().format(),
            isModalOpen: false
        };
    }
    onInputChange = e => this.setState({content: e.target.value});
    openModal = () => this.setState({isModalOpen: true});
    closeModal = () => this.setState({isModalOpen: false});
    onSubmit = () => this.props.sendAMessage(this.state);
    render() {
        return (
            <div>
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.large}
                    onClick={this.openModal}
                    caption="Send a message"
                />
                <Modal
                    isOpen={this.state.isModalOpen}
                    close={this.closeModal}
                >
                    <Textarea
                        placeholder="Enter your message..."
                        onChange={this.onInputChange}
                        value={this.state.content}
                    />
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.large}
                        onClick={this.onSubmit}
                        caption="Send"
                    />
                </Modal>
            </div>
        );
    }
}

export default connect(({user}) => ({user: user}), {
    sendAMessage
})(ContactOwner);
