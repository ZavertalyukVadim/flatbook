import React from 'react';
import Container from '../../components/container';
import Sidebar from '../../components/sidebar';
import Announcement from '../../components/announcement';

let example = {
    visibility: false,
    title: 'Title should be here',
    description: 'description should be here',
    photos: [
        'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?fit=crop&fm=jpg&h=825&q=80&w=1325',
        'https://images.unsplash.com/photo-1445251836269-d158eaa028a6?fit=crop&fm=jpg&h=825&q=80&w=1325',
        'https://images.unsplash.com/photo-1443926818681-717d074a57af?fit=crop&fm=jpg&h=825&q=80&w=1325'
    ],
    pricePerDay: '2343434',
    pricePerMonth: '2434234444'
};

const Profile = () => {
 return (
     <Container
         sidebar={
             <Sidebar/>
         }
     >
     <Announcement
         {...example}
     />
     </Container>
 );
};

export default Profile;
