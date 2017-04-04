import React from 'react';
import Container from '../../components/container';
import Search from '../../components/search-form';

export default ({history}) =>
    <Container>
        <Search redirect={path => history.push(path)}/>
    </Container>;
