import {CALL_API, get} from '../api';
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