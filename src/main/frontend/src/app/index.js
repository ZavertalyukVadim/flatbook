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
import Profile from '../routes/profile';
import Settings from '../routes/profile/settings';
import Messages from '../routes/profile/messages';
import Favourite from '../routes/profile/favourite';
import '../style/grid.scss';
import './app.scss';
import store from '../store';

export default () =>
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path="/profile/favourite" component={Favourite}/>
                <Route path="/profile/messages" component={Messages}/>
                <Route path="/profile/settings" component={Settings}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/showroom" component={Showroom}/>
                <Route path="/search" component={Search}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/" component={Root}/>
            </Switch>
        </Router>
    </Provider>;
