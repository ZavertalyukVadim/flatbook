import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAnnouncementChats, getAnnouncementMessages} from '../../../actions/user-actions';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import Loader from '../../../components/loader';
import AnnouncementPreview from '../../../components/announcement/announcement-preview';

class Messages extends Component {

    componentDidMount() {
        this.props.getAnnouncementChats();
        this.props.getAnnouncementMessages(111);
    }

    render() {
        console.log(this.props.user);
        return (
            <Container
                sidebar={
                    <Sidebar/>
                }
            >
                <div className="announcements-field">
                    {/*{loaded ? (*/}
                        {/*<div className="announcements-field">*/}
                            {/*{data.map((item, index) =>*/}
                                {/*<AnnouncementPreview*/}
                                    {/*key={index}*/}
                                    {/*{...item}*/}

                                {/*/>*/}
                            {/*)*/}
                            {/*}*/}
                        {/*</div>) : (<Loader/>)}*/}

                </div>
            </Container>
        );
    }
}
;

export default connect(({user}) => ({user: user.messages}), {getAnnouncementChats, getAnnouncementMessages})(Messages);
