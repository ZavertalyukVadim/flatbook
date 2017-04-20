import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {getAnnouncementById} from '../../../actions/announcement-actions';
import AnnouncementPreview from '../../../components/announcement/announcement-preview';

class BookingView extends Component {

    componentDidMount() {
        const {announcementsId} = this.props;
        this.props.getAnnouncementById(announcementsId);
    }

    render() {
        const {from, to} = this.props;
        const {data, loaded} = this.props.announcements;
        return (
            <div className="booking-view">
                {loaded ?
                    <div className="announcements-field">
                        <div>From: {from.dayOfMonth}, {from.month}, {from.year} <br/>
                            To: {to.dayOfMonth}, {to.month}, {to.year}</div>
                        <AnnouncementPreview vertical={true} {...data}/>
                    </div> : <div>Loading</div>
                }
            </div>
        );
    };
}

export default connect(({announcements}) => ({announcements: announcements.announcementView}), {getAnnouncementById})(BookingView);