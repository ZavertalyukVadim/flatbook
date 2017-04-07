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

let example = [{
    visibility: false,
    title: 'Title should be here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    photos: [
        'http://studioapartmentstorent.com/wp-content/uploads/2014/12/Vilnius-Cheap-Flat-To-Let.jpg',
        'http://www.1property.in/resources/props/Apartment-in-Guwahati-rent-1700x839.jpg',
        'https://s-media-cache-ak0.pinimg.com/originals/af/c1/29/afc1299c0f55f0e248c427898dbc3f92.jpg'
    ],
    pricePerDay: '234,34',
    pricePerMonth: '1234,56'
},
    {
        visibility: false,
        title: 'Title should be here',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        photos: [
            'http://studioapartmentstorent.com/wp-content/uploads/2014/12/Vilnius-Cheap-Flat-To-Let.jpg',
            'http://www.1property.in/resources/props/Apartment-in-Guwahati-rent-1700x839.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/af/c1/29/afc1299c0f55f0e248c427898dbc3f92.jpg'
        ],
        pricePerDay: '234,34',
        pricePerMonth: '1234,56'
    },
    {
        visibility: false,
        title: 'Title should be here',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        photos: [
            'http://studioapartmentstorent.com/wp-content/uploads/2014/12/Vilnius-Cheap-Flat-To-Let.jpg',
            'http://www.1property.in/resources/props/Apartment-in-Guwahati-rent-1700x839.jpg',
            'https://s-media-cache-ak0.pinimg.com/originals/af/c1/29/afc1299c0f55f0e248c427898dbc3f92.jpg'
        ],
        pricePerDay: '234,34',
        pricePerMonth: '1234,56'
    }];

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 2
        }
    }

    componentDidMount() {
        this.props.getUserAnnouncements();
        console.log(this.props);
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
}
;

export default connect(({user}) => ({user: user}), {getUserAnnouncements, deleteAnnouncement})(Profile);
