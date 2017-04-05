import React from 'react';
import Container from '../../../components/container';
import Sidebar from '../../../components/sidebar';
import AnnouncementForm from '../../../components/announcement-form';

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
