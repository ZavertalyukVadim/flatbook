import React from 'react';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import AnnouncementForm from '../../../components/profile/announcement-form';

const AnnouncementCreation = () => {
    return (
        <Container
            sidebar={
                <Sidebar/>
            }
        >
            <AnnouncementForm/>

        </Container>
    );
};

export default AnnouncementCreation;
