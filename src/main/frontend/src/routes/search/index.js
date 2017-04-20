import React from 'react';
import Container from '../../components/container';
import SearchResult from '../../components/search/search-result';
import SearchForm from '../../components/search/search-form';

export default () =>
    <Container
        sidebar={
            <SearchForm type="vertical"/>
        }>
        <SearchResult/>
    </Container>;