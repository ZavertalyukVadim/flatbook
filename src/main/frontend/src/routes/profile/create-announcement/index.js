import React from 'react';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import AnnouncementNew from '../../../components/announcement/announcement-new';

const AnnouncementCreation = () => {
    return (
        <Container
            sidebar={
                <Sidebar/>
            }
        >
            <AnnouncementNew/>
        </Container>
    );
};

export default AnnouncementCreation;
