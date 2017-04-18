import React from 'react';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
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
import AnnouncementCreation from '../routes/profile/create-announcement';
import Announcement from '../routes/announcement/id';
import AnnouncementEdit from '../routes/announcement/id/edit';
import '../style/grid.scss';
import './app.scss';
import store from '../store';
import history from '../utils/history';

export default () =>
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/announcement/:id/edit" component={AnnouncementEdit}/>
                <Route path="/announcement/:id" component={Announcement}/>
                <Route path="/profile/create-announcement" component={AnnouncementCreation}/>
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
