import React from 'react';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import AnnouncementForm from '../../../components/profile/announcement-form';

const AnnouncementCreation = ({history}) => {
    return (
        <Container
            sidebar={
                <Sidebar/>
            }
        >
            <AnnouncementForm redirect={path => history.push(path)}/>
        </Container>
    );
};

export default AnnouncementCreation;
