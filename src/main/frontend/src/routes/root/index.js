import React from 'react';
import Container from '../../components/container';
import AnnouncementsList from '../../components/announcement/announcements-list';
import SearchForm from '../../components/search/search-form';

export default () =>
    <Container
        image='https://www.mebel.ru/images/interiors/26112015/144.jpg'
    >

        <SearchForm/>
        <AnnouncementsList/>
    </Container>;
