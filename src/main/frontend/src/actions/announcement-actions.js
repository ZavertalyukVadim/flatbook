import {CALL_API, get, post, put} from '../api';
import * as ActionTypes from './announcement-constants';

export const getAllAnnouncements = () => (dispatch, getState) => {
    const {announcements: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_ALL_ANNOUNCEMENTS_REQUEST,
                ActionTypes.GET_ALL_ANNOUNCEMENTS_SUCCESS,
                ActionTypes.GET_ALL_ANNOUNCEMENTS_FAILURE
            ],
            endpoint: () => get('announcement/all/0/20')
        }
    });
};

export const addNewAnnouncement = body => (dispatch, getState) => {
    const {announcements: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.ADD_NEW_ANNOUNCEMENT_REQUEST,
                ActionTypes.ADD_NEW_ANNOUNCEMENT_SUCCESS,
                ActionTypes.ADD_NEW_ANNOUNCEMENT_FAILURE
            ],
            endpoint: () => post('announcement/', body)
        }
    });
};

export const updateAnnouncement = body => (dispatch, getState) => {
    const {announcements: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.UPDATE_ANNOUNCEMENT_REQUEST,
                ActionTypes.UPDATE_ANNOUNCEMENT_SUCCESS,
                ActionTypes.UPDATE_ANNOUNCEMENT_FAILURE
            ],
            endpoint: () => put('announcement/', body)
        }
    });
};

export const getAnnouncementById = id => (dispatch, getState) => {
    const {announcements: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_ANNOUNCEMENT_BY_ID_REQUEST,
                ActionTypes.GET_ANNOUNCEMENT_BY_ID_SUCCESS,
                ActionTypes.GET_ANNOUNCEMENT_BY_ID_FAILURE
            ],
            endpoint: () => get(`announcement/${id}`)
        }
    });
};
