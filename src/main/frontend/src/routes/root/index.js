import React from 'react';
import {Link} from 'react-router';

export default () =>
    <div>
        <h1>Root page</h1>
        <Link to="showroom">Showroom</Link>
        <br/>
        <Link to="signup">Sign Up</Link>
        <br/>
        <Link to="signin">Sign In</Link>
    </div>;
