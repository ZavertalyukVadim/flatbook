import React, {Component}  from 'react';
import Container from '../../../components/container';
import AnnouncementView from '../../../components/announcement/announcement-view';
import {getAnnouncementById} from '../../../actions/announcement-actions';
import Loader from '../../../components/loader';
import {connect} from 'react-redux';



class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id

        }
    }

    componentDidMount() {
        this.props.getAnnouncementById(this.state.id);
    }


    render() {
        const {loaded, data} = this.props.announcements.announcementView;
        console.log(data);
        return (

            <Container>
                {loaded ? <AnnouncementView data={data}/> : <Loader/>}
            </Container>

        );
    }
}

export default connect(({announcements}) => ({announcements: announcements}), {getAnnouncementById})(Announcement);