import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllAnnouncements} from '../../../actions/announcement-actions';
import AnnouncementPreview from '../../../components/announcement/announcement-preview';
import Pagination from '../../../components/pagination';
import Header, {HeaderTypes} from '../../../components/header';
import './all-announcements.scss';

class AnnouncementsList extends Component {
    componentDidMount() {
        this.props.getAllAnnouncements();
    }

    getAnnouncementPage = pageID => this.props.getAllAnnouncements(pageID);

    render() {
        const {announcements: {data, loaded}} = this.props;
        const {totalPages, number} = data;

        return (
            <div className="last-updated-announcements">
                {
                    loaded ? (
                        <div className="announcements-field">
                            {data.content.map((item, index) =>
                                <AnnouncementPreview
                                    vertical={true}
                                    key={index}
                                    {...item}
                                />
                            )}
                        </div>)
                        : <div>Loading</div>
                }
                <Pagination
                    totalPages={totalPages}
                    currentPage={number}
                    getAnnouncementPage={this.getAnnouncementPage}
                />
            </div>
        );
    }
}

export default connect(
    ({announcements: {announcements}}) => ({
        announcements: {...announcements}
    }), {
        getAllAnnouncements
    })(AnnouncementsList);
