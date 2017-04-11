import {combineReducers} from 'redux';
import search from './search-reducer';
import user from './user-reducer';
import  announcements from './announcements-reducer';
import  amenity from './amenity-reducer';

export default combineReducers({
    search,
    user,
    announcements,
    amenity
});
