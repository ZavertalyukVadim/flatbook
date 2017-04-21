import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserBookings} from '../../../actions/user-actions';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import Loader from '../../../components/loader';
import BookingView from '../../../components/booking/booking-view';

class UserBookings extends Component {

    componentDidMount() {
        this.props.getUserBookings();
    }

    render() {
         const {loaded, data} = this.props.user.booking;
        console.log(this.props.user.booking);
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
                                <BookingView

                                    key={index}
                                    {...item}

                                />
                            )
                            }
                        </div>) : (<Loader/>)}

                </div>
            </Container>
        );
    }
}
;

export default connect(({user}) => ({user: user}), {getUserBookings})(UserBookings);