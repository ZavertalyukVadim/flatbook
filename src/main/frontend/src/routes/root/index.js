import React from 'react';
import Container from '../../components/container';
import AllAnnouncements from '../../components/all-announcements';
import SearchForm from '../../components/search/search-form';

export default ({history}) =>
    <Container>
        <SearchForm redirect={path => history.push(path)}/>
        <AllAnnouncements/>
    </Container>;
