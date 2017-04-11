import React from 'react';
import Container from '../../components/container';
import AnnouncementsList from '../../components/announcement/announcements-list';
import SearchForm from '../../components/search/search-form';

export default ({history}) =>
    <Container>
        <SearchForm redirect={path => history.push(path)}/>
        <AnnouncementsList/>
    </Container>;
