import React from 'react';
import Container from '../../components/container';
import SearchForm from '../../components/search/search-form';

export default ({history}) =>
    <Container>
        <SearchForm redirect={path => history.push(path)}/>
    </Container>;
