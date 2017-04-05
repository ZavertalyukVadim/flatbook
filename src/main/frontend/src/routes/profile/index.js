import React from 'react';
import Container from '../../components/container';
import Sidebar from '../../components/sidebar';
import Announcement from '../../components/announcement';

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

const Profile = () => {
 return (
     <Container
         sidebar={
             <Sidebar/>
         }
     >
     {example.map((item, index) =>
        <Announcement
         {...item}
     />)
    }
     </Container>
 );
};

export default Profile;
