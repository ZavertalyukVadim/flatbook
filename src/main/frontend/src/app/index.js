import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import Showroom from '../components/showroom';
import Root from '../routes/root';
import SignUp from '../routes/signup';
import '../style/grid.scss';
import './app.scss';

export default () =>
    <div>
        <Router history={browserHistory}>
            <Route path="/" component={Root}/>
            <Route path="/showroom" component={Showroom}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signin" component={Showroom}/>
        </Router>
    </div>;
