import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllAnnouncements} from '../../actions/announcement-actions';
import AnnouncementPreview from '../../components/announcement/announcement-preview';
import Header, {HeaderTypes} from '../../components/header';
import './all-announcements.scss';

class AllAnnouncements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 2
        }
    }

    componentDidMount() {
        this.props.getAllAnnouncements();
        console.log(this.props);
    }

    render() {
        return (
                <div>
                    <Header
                        type={HeaderTypes.primary}
                        value="Last updated announcements"
                        className="main-header"
                    />
                    {this.props.announcements.loaded ? (
                        <div className="announcements-field">
                            {this.props.announcements.announcements.map((item, index) =>
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

export default connect(({announcements}) => ({announcements: announcements}), {getAllAnnouncements})(AllAnnouncements);