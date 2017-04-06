import React from 'react';
import Container from '../../components/container';
import SignUp from '../../components/auth/signup';

const SignUpPage = ({history}) =>
    <Container>
        <SignUp redirect={path => history.push(path)}/>
    </Container>;

export default SignUpPage
