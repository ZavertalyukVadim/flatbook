import {combineReducers} from 'redux';
import signin from './signin-reducer';
import search from './search-reducer';

export default combineReducers({
    signin,
    search
});
