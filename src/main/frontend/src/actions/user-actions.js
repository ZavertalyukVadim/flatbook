import {CALL_API, get, remove, put, custom} from '../api';
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
            endpoint: () => get('announcement/all/0/20')
        }
    });
};

export const deleteAnnouncement = id => dispatch => {
    console.log(id);
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

export const getLikedAnnouncements = () => (dispatch, getState) => {
    const {user: {favouriteAnnouncements: {pending}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_FAVOURITE_ANNOUNCEMENTS_REQUEST,
                ActionTypes.GET_FAVOURITE_ANNOUNCEMENTS_SUCCESS,
                ActionTypes.GET_FAVOURITE_ANNOUNCEMENTS_FAILURE
            ],
            endpoint: () => post('profile/favorites')
        }
    });
};

export const addAnnouncementToFavourites = id => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.ADD_FAVOURITE_ANNOUNCEMENT_REQUEST,
                ActionTypes.ADD_FAVOURITE_ANNOUNCEMENT_SUCCESS,
                ActionTypes.ADD_FAVOURITE_ANNOUNCEMENT_FAILURE
            ],
            endpoint: () => post(`profile/${id}/favorite`)
        }
    });
};

export const changeUserAnnouncementVisibility = id => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.CHANGE_USER_ANNOUNCEMENT_VISIBILITY_REQUEST,
                ActionTypes.CHANGE_USER_ANNOUNCEMENT_VISIBILITY_SUCCESS,
                ActionTypes.CHANGE_USER_ANNOUNCEMENT_VISIBILITY_FAILURE
            ],
            endpoint: () => put(`announcement/${id}/changeVisibility`)
        }
    });
};

export const deleteAnnouncementFromFavourites = id => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.DELETE_FAVOURITE_ANNOUNCEMENT_REQUEST,
                ActionTypes.DELETE_FAVOURITE_ANNOUNCEMENT_SUCCESS,
                ActionTypes.DELETE_FAVOURITE_ANNOUNCEMENT_FAILURE
            ],
            endpoint: () => remove(`profile/${id}/removeFromFavorite`)
        }
    });
};

export const signin = user => (dispatch, getState) => {

    const {user: {auth: {pending}}} = getState();

    if (pending) {
        return null;
    }

    const body = {...user, grant_type: 'password'};

    const CONFIG = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0'
        },
        body: Object.keys(body)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
            .join('&')
    };

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.SIGN_IN_REQUEST,
                ActionTypes.SIGN_IN_SUCCESS,
                ActionTypes.SIGN_IN_FAILURE
            ],
            endpoint: () => custom('oauth/token', CONFIG)
        }
    });
};

export const signout = user => (dispatch) => {
    return dispatch({
        type: ActionTypes.SIGN_OUT_SUCCESS
    });
};
