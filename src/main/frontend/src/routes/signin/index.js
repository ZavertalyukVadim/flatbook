import React from 'react';
import Container from '../../components/container';
import SignIn from '../../components/auth/signin';

const SignInPage = ({history}) =>
    <Container>
        <SignIn redirect={path => history.push(path)}/>
    </Container>;

export default SignInPage
