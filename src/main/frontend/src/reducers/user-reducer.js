import * as ActionTypes from '../actions/user-constants';

const DEFAULT_STATE = {
    announcements: [],
    data: {
        phones: [],
        emails: []
    },
    loaded: false
};

export default (state = DEFAULT_STATE, action) => {

    if (action.type === ActionTypes.GET_USER_REQUEST) {
        return {...state, loaded: false};
    }

    if (action.type === ActionTypes.GET_USER_SUCCESS) {
        return {...state, data: action.response, loaded: true};
    }

    if (action.type === ActionTypes.GET_USER_FAILURE) {
        return {...state, loaded: false};
    }
    if (action.type === ActionTypes.UPDATE_USER_REQUEST) {
        return {...state, loaded: false};
    }

    if (action.type === ActionTypes.UPDATE_USER_SUCCESS) {
        return {...state, data: action.response, loaded: true};
    }

    if (action.type === ActionTypes.UPDATE_USER_FAILURE) {
        return {...state, loaded: false};
    }

    if (action.type === ActionTypes.GET_USER_ANNOUNCEMENTS_REQUEST) {
        return {...state, loaded: false};
    }

    if (action.type === ActionTypes.GET_USER_ANNOUNCEMENTS_SUCCESS) {
        return {...state, announcements: action.response, loaded: true};
    }

    if (action.type === ActionTypes.GET_USER_ANNOUNCEMENTS_FAILURE) {
        return {...state, loaded: false};
    }

    if (action.type === ActionTypes.DELETE_USER_ANNOUNCEMENTS_REQUEST) {
        return {...state, loaded: false};
    }

    if (action.type === ActionTypes.DELETE_USER_ANNOUNCEMENTS_SUCCESS) {
        return {...state, announcements: state.user.announcements.filter(obj => obj.id !== action.response.id), loaded: true};
    }

    if (action.type === ActionTypes.DELETE_USER_ANNOUNCEMENTS_FAILURE) {
        return {...state, loaded: false};
    }

    return state;
};
