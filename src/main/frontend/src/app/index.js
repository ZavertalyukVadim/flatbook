import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import Showroom from '../components/showroom';
import Root from '../routes/root';
import SignUp from '../routes/signup';
import SignIn from '../routes/signin';
import '../style/grid.scss';
import './app.scss';
import store from '../store';

export default () =>
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Root}/>
            <Route path="/showroom" component={Showroom}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signin" component={SignIn}/>
        </Router>
    </Provider>;
