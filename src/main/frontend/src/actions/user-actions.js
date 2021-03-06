import {CALL_API, get, remove, put, post, custom} from '../api';
import {getAuthorization} from '../utils/auth';
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
            endpoint: () => get('profile/announcements')
        }
    });
};

export const deleteAnnouncement = id => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.DELETE_USER_ANNOUNCEMENTS_REQUEST,
                ActionTypes.DELETE_USER_ANNOUNCEMENTS_SUCCESS,
                ActionTypes.DELETE_USER_ANNOUNCEMENTS_FAILURE
            ],
            endpoint: () => remove(`announcement/${id}`)
        },
        id: id
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
        },
        id: id
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

export const getUserAvatar = () => (dispatch, getState) => {
    const {loaded} = getState();

    if (loaded) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_USER_AVATAR_REQUEST,
                ActionTypes.GET_USER_AVATAR_SUCCESS,
                ActionTypes.GET_USER_AVATAR_FAILURE
            ],
            endpoint: () => get(`profile/photo`)
        }
    });
};

export const signup = body => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.SIGN_UP_REQUEST,
                ActionTypes.SIGN_UP_SUCCESS,
                ActionTypes.SIGN_UP_FAILURE
            ],
            endpoint: () => post('profile', body)
        }
    });
};

export const getUserBookings = () => (dispatch, getState) => {
    const {user: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_USER_BOOKINGS_REQUEST,
                ActionTypes.GET_USER_BOOKINGS_SUCCESS,
                ActionTypes.GET_USER_BOOKINGS_FAILURE
            ],
            endpoint: () => get('rent/current')
        }
    });
};

export const sendAMessage = body => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.SEND_A_MESSAGE_REQUEST,
                ActionTypes.SEND_A_MESSAGE_SUCCESS,
                ActionTypes.SEND_A_MESSAGE_FAILURE
            ],
            endpoint: () => post('chat/send', body)
        }
    });
};

export const getAnnouncementChats = () => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_CHATS_REQUEST,
                ActionTypes.GET_CHATS_SUCCESS,
                ActionTypes.GET_CHATS_FAILURE
            ],
            endpoint: () => get('chat/chats')
        }
    });
};

export const getAnnouncementMessages = (announcementId, receiverId, pageNum = 0, itemsPerPage = 20) => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_MESSAGES_REQUEST,
                ActionTypes.GET_MESSAGES_SUCCESS,
                ActionTypes.GET_MESSAGES_FAILURE
            ],
            endpoint: () => get(`chat/${pageNum}/${itemsPerPage}/${announcementId}/${receiverId}`)
        }
    });
};
