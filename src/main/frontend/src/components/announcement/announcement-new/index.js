import React, {Component} from 'react';
import {connect} from 'react-redux';
import AnnouncementForm from '../announcement-form';
import {addNewAnnouncement} from '../../../actions/announcement-actions';
import {redirect} from '../../../utils/history';

class AnnouncementNew extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.announcement.data !== nextProps.announcement.data) {
            redirect(`/announcement/${nextProps.announcement.data.id}`)
        }
    }

    render() {
        return (
            <AnnouncementForm
                onSave={this.props.addNewAnnouncement}
            />
        )
    }
}

export default connect(
    ({
         announcements: {
             uploaded
         }
     }) => ({
        announcement: uploaded
    }), {
        addNewAnnouncement,
    })(AnnouncementNew);
