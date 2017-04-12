import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserAnnouncements, deleteAnnouncement} from '../../actions/user-actions';
import Container from '../../components/container';
import Sidebar from '../../components/profile/sidebar';
import AnnouncementControl from '../../components/announcement/announcement-control';
import {Link} from 'react-router-dom';
import './profile.scss';
import Button, {ButtonTypes, ButtonSizes} from '../../components/button';
import {noop} from 'lodash';

class Profile extends Component {

    componentDidMount() {
        this.props.getUserAnnouncements();
    }

    onDelete = id => this.props.deleteAnnouncement(id);

    render() {
        return (
            <Container
                sidebar={
                    <Sidebar/>
                }
            >
                <div className="announcements-field">
                    <div className="create-announcement-link">
                        <Link to='/profile/create-announcement'>
                            <Button
                                type={ButtonTypes.primary}
                                size={ButtonSizes.medium}
                                onClick={noop}
                                caption="Create Announcement"
                            />
                        </Link>
                    </div>
                    {this.props.user.announcements.map((item, index) =>
                        <AnnouncementControl
                            key={index}
                            {...item}
                            onDelete={this.onDelete}
                        />
                    )
                    }
                </div>
            </Container>
        );
    }
};

export default connect(({user}) => ({user: user}), {getUserAnnouncements, deleteAnnouncement})(Profile);
