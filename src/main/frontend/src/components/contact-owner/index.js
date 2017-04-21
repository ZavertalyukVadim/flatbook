import React, {Component} from 'react';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Textarea from '../textarea';
import moment from 'moment';
import {connect} from 'react-redux';
import {sendAMessage} from '../../actions/user-actions';
import Modal from '../modal';
import Header, {HeaderTypes} from '../header';
import './contact-owner.scss';

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
    onSubmit = () => {this.props.sendAMessage(this.state); this.setState({isModalOpen: false})};
    render() {
        return (
            <div>
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.block}
                    onClick={this.openModal}
                    caption="Send a message"
                />
                <Modal
                    isOpen={this.state.isModalOpen}
                    close={this.closeModal}
                >
                    <div className="contact-owner-field">
                        <Header type={HeaderTypes.primary} value='Send your message'/>
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
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(({user}) => ({user: user}), {
    sendAMessage
})(ContactOwner);
