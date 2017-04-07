import {CALL_API, get, post, remove, put} from '../api';
import * as ActionTypes from './user-constants';

export const getUser = id => (dispatch, getState) => {
    const {user: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_USER_REQUEST,
                ActionTypes.GET_USER_SUCCESS,
                ActionTypes.GET_USER_FAILURE
            ],
            endpoint: () => get('profile')
        }
    });
};

export const updateUser = values => (dispatch, getState) => {
    const {user: {pending}} = getState();

    if (pending) {
        return null;
    }
    console.log(values);
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.UPDATE_USER_REQUEST,
                ActionTypes.UPDATE_USER_SUCCESS,
                ActionTypes.UPDATE_USER_FAILURE
            ],
            endpoint: () => put('profile/', values)
        }
    });
};



export const getUserAnnouncements = id => (dispatch, getState) => {
    const {user: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_USER_ANNOUNCEMENTS_REQUEST,
                ActionTypes.GET_USER_ANNOUNCEMENTS_SUCCESS,
                ActionTypes.GET_USER_ANNOUNCEMENTS_FAILURE
            ],
            endpoint: () => get('announcement/')
        }
    });
};

export const deleteAnnouncement = id => (dispatch, getState) => {
    const {user: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.DELETE_USER_ANNOUNCEMENTS_REQUEST,
                ActionTypes.DELETE_USER_ANNOUNCEMENTS_SUCCESS,
                ActionTypes.DELETE_USER_ANNOUNCEMENTS_FAILURE
            ],
            endpoint: () => remove(`announcement/${id}`)
        }
    });
};


export const signin = user => dispatch => {

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.SIGN_IN_REQUEST,
                ActionTypes.SIGN_IN_SUCCESS,
                ActionTypes.SIGN_IN_FAILURE
            ],
            endpoint: () => post('login', {
                username: user.email,
                password: user.password
            })
        }
    });
};
