import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getLikedAnnouncements} from '../../../actions/user-actions';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import Loader from '../../../components/loader';
import AnnouncementPreview from '../../../components/announcement/announcement-preview';

class Favourite extends Component {

    componentDidMount() {
        this.props.getLikedAnnouncements();
        console.log(this.props);
    }

    render() {
        const {loaded, data} = this.props.user.favouriteAnnouncements;
        return (
            <Container
                sidebar={
                    <Sidebar/>
                }
            >
                <div className="announcements-field">

                    {loaded ? (
                        <div className="announcements-field">
                            {data.map((item, index) =>
                                <AnnouncementPreview
                                    key={index}
                                    {...item}

                                />
                            )
                            }
                        </div>) : (<div>Loading</div>)}

                </div>
            </Container>
        );
    }
}
;

export default connect(({user}) => ({user: user}), {getLikedAnnouncements})(Favourite);