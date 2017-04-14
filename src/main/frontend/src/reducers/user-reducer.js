import * as ActionTypes from '../actions/user-constants';

const auth = JSON.parse(localStorage.getItem('auth'));

const DEFAULT_STATE = {
    announcements: [],
    data: {
        phones: [],
        emails: []
    },
    auth: {
        pending: false,
        logged: false,
        ...auth
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
        return {
            ...state,
            announcements: state.user.announcements.filter(obj => obj.id !== action.response.id),
            loaded: true
        };
    }

    if (action.type === ActionTypes.DELETE_USER_ANNOUNCEMENTS_FAILURE) {
        return {...state, loaded: false};
    }

    if (action.type === ActionTypes.SIGN_IN_REQUEST) {
        return {...state, auth: {pending: true}};
    }

    if (action.type === ActionTypes.ADD_AUTH_TO_STORE) {
        return {
            ...state, auth: {
                pending: false, logged: true, token: `${action.response.token_type} ${action.response.access_token}`
            }
        };
    }

    if (action.type === ActionTypes.REMOVE_AUTH_FROM_STORE) {
        return {...state, auth: {pending: false, logged: false}};
    }

    return state;
};
