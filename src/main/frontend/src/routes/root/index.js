import React from 'react';
import {Link} from 'react-router';

export default () =>
    <div style={{marginLeft: '50px', fontSize: '20px'}}>
        <h1>Root page</h1>
        <Link to="showroom">Showroom</Link>
        <br/>
        <Link to="signup">Sign Up</Link>
        <br/>
        <Link to="signin">Sign In</Link>
    </div>;
