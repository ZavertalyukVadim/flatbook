import {combineReducers} from 'redux';
import search from './search-reducer';
import user from './user-reducer';

export default combineReducers({
    search,
    user
});
