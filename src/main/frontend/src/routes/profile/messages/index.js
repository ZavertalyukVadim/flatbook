import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAnnouncementChats, getAnnouncementMessages, sendAMessage} from '../../../actions/user-actions';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import {isEqual, isNull} from "lodash";
import './messages.scss';
import Textarea from "../../../components/textarea/index";
import Button from "../../../components/button/index";

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            received: []
        }
    }

    componentDidMount() {
        this.props.getAnnouncementChats();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user.chats !== nextProps.user.chats) {
            nextProps.user.chats.map(c => this.props.getAnnouncementMessages(c.announcementId, c.receiverId))
        }

        this.setState({received: nextProps.user.received.map(r => ({...r, newMessage: ''}))})
    }

    onChangeNewMessage = (index) => (e) => this.setState({
        received: [
            ...this.state.received.map((r, i) => ({...r, newMessage: i === index ? e.target.value : r.newMessage}))
        ]
    });
    onSave = (announcementId, senderId, receiverId, messageId) => () => {
        this.props.sendAMessage({
            content: this.state.received[messageId].newMessage,
            receiverId: receiverId,
            senderId: senderId,
            announcementId: announcementId
        });

        this.props.getAnnouncementChats();
    };

    render() {
        const {received} = this.state;

        return (
            <Container
                sidebar={
                    <Sidebar/>
                }
            >
                {

                    received.length ?
                        <ul className="messages">
                            {
                                received
                                    .filter(({communicatorsPageDto}) => !isNull(communicatorsPageDto.you))
                                    .map(
                                        ({communicatorsPageDto, newMessage}, index) => {
                                            const {me, you, messageDtoPage: {content}} = communicatorsPageDto;

                                            return (
                                                <li key={index} className="messages-dialog">
                                                    <Dialog index={index} me={me} you={you}/>
                                                    <Textarea
                                                        onChange={this.onChangeNewMessage(index)}
                                                        value={newMessage}
                                                    />
                                                    <Button
                                                        onClick={this.onSave(content[0].message.announcementId, me.id, you.id, index)}
                                                        caption="Send"
                                                        type={'btn-primary'}
                                                    />
                                                </li>
                                            )
                                        }
                                    )
                            }
                        </ul>
                        : <div>You don't have massages yet</div>
                }
            </Container>
        );
    }
}

const Dialog = connect(({user}) => ({received: user.messages.received}), {getAnnouncementChats})(
    class extends Component {

        render() {
            const {received, index} = this.props;

            const {communicatorsPageDto: {messageDtoPage: {content}, me, you}} = received[index];
            return <div>
                {
                    content.map((m, i) =>
                        <div key={i} className="dialog-messages">
                            {
                                !isNull(m.my) ?
                                    `${me.firstName} ${me.lastName}: `
                                    : `${you.firstName} ${you.lastName}: `
                            }
                            {m.message.content}
                        </div>
                    )}
            </div>;
        }
    });

export default connect(({user}) => ({user: user.messages}), {
    getAnnouncementChats,
    getAnnouncementMessages,
    sendAMessage
})(Messages);
