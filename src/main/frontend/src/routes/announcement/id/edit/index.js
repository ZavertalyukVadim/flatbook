import React from 'react';
import Container from '../../../../components/container';
import Sidebar from '../../../../components/profile/sidebar';
import AnnouncementEditForm from '../../../../components/announcement/announcement-edit';

const AnnouncementEdit = ({match: {params}}) => {
    return (
        <Container
            sidebar={
                <Sidebar/>
            }
        >
            <AnnouncementEditForm id={params.id}/>
        </Container>
    );
};

export default AnnouncementEdit;
