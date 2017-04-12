import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllAnnouncements} from '../../../actions/announcement-actions';
import AnnouncementPreview from '../.././../components/announcement/announcement-preview';
import Header, {HeaderTypes} from '../../../components/header';
import './all-announcements.scss';

class AnnouncementsList extends Component {
    componentDidMount() {
        this.props.getAllAnnouncements();
    }

    render() {
        return (
                <div>
                    <Header
                        type={HeaderTypes.primary}
                        value="Last updated announcements"
                        className="main-header"
                    />
                    {this.props.announcements.announcements.loaded ? (
                        <div className="announcements-field">
                            {this.props.announcements.announcements.data.map((item, index) =>
                                <AnnouncementPreview
                                    key={index}
                                    {...item}

                                />
                            )
                            }
                        </div>) : (<div>Loading</div>)}
                </div>

        );
    }
}
;

export default connect(({announcements}) => ({announcements: announcements}), {getAllAnnouncements})(AnnouncementsList);