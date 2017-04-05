import React from 'react';
import {Link} from 'react-router-dom';
import Container from '../../components/container';
import Search from '../../components/search-form';

export default ({history}) =>
    <Container>
        <Search redirect={path => history.push(path)}/>
        <Link to="/showroom">Showroom</Link>
    </Container>;
