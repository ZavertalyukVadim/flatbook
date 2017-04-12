import React from 'react';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import AnnouncementNew from '../../../components/announcement/announcement-new';

const AnnouncementCreation = ({history}) => {
    return (
        <Container
            sidebar={
                <Sidebar/>
            }
        >
            <AnnouncementNew redirect={path => history.push(path)}/>
        </Container>
    );
};

export default AnnouncementCreation;
