import React from 'react';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';
import Showroom from '../components/showroom';
import Root from '../routes/root';
import SignUp from '../routes/signup';
import SignIn from '../routes/signin';
import Search from '../routes/search';
import '../style/grid.scss';
import './app.scss';
import store from '../store';

export default () =>
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path="/showroom" component={Showroom}/>
                <Route path="/search" component={Search}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/" component={Root}/>
            </Switch>
        </Router>
    </Provider>;
