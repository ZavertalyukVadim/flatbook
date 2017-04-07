import * as ActionTypes from '../actions/announcement-constants';

const DEFAULT_STATE = {
    announcements: [],
    loaded: false,
    pending: false
};

export const announcements = (state = DEFAULT_STATE, action) => {

    if (action.type === ActionTypes.GET_ALL_ANNOUNCEMENTS_REQUEST) {
        return {...state, loaded: false, pending: true};
    }

    if (action.type === ActionTypes.GET_ALL_ANNOUNCEMENTS_SUCCESS) {
        return {...state, announcements: action.response, loaded: true, pending: false};
    }

    if (action.type === ActionTypes.GET_ALL_ANNOUNCEMENTS_FAILURE) {
        return {...state, loaded: false, pending: false}
    }

    return state;
};

