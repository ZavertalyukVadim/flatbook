import {CALL_API, get, post} from '../api';
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
            endpoint: () => get('announcement/')
        }
    });
};

export const saveAnnouncement = body => (dispatch, getState) => {
    const {announcements: {pending}} = getState();

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.UPDATE_ANNOUNCEMENT_REQUEST,
                ActionTypes.UPDATE_ANNOUNCEMENT_SUCCESS,
                ActionTypes.UPDATE_ANNOUNCEMENT_FAILURE
            ],
            endpoint: () => post('announcement/', body)
        }
    });
};
