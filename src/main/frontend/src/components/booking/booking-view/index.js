import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {getAnnouncementById} from '../../../actions/announcement-actions';
import AnnouncementPreview from '../../../components/announcement/announcement-preview';
import './booking-view.scss';

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
                    <div className="booking-announcements-field">
                        <div>From: <i className="fa fa-calendar" /> {from.dayOfMonth}, {from.month}, {from.year} -
                            To: <i className="fa fa-calendar" /> {to.dayOfMonth}, {to.month}, {to.year}</div>
                        <AnnouncementPreview horisontal={true} {...data}/>
                    </div> : <div>Loading</div>
                }
            </div>
        );
    };
}

export default connect(({announcements}) => ({announcements: announcements.announcementView}), {getAnnouncementById})(BookingView);