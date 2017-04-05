import {combineReducers} from 'redux';
import signin from './signin-reducer';
import search from './search-reducer';
import user from './user-reducer';

export default combineReducers({
    signin,
    search,
    user
});
