import {CALL_API, get, post, put, remove} from '../api';
import * as ActionTypes from './announcement-constants';

export const getAllAnnouncements = (pageID = 0) => (dispatch, getState) => {
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
            endpoint: () => get(`announcement/all/${pageID}/6`)
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

export const getAnnouncementComments = id => (dispatch, getState) => {
    const {announcements: {announcementView: {comments: {pending}}}} = getState();
    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_ANNOUNCEMENT_COMMENTS_REQUEST,
                ActionTypes.GET_ANNOUNCEMENT_COMMENTS_SUCCESS,
                ActionTypes.GET_ANNOUNCEMENT_COMMENTS_FAILURE
            ],
            endpoint: () => get(`comment/${id}`)
        }
    });
};

export const addNewComment = body => (dispatch, getState) => {
    const {announcements: {announcementView: {comments: {pending}}}} = getState();
    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.POST_NEW_COMMENT_REQUEST,
                ActionTypes.POST_NEW_COMMENT_SUCCESS,
                ActionTypes.POST_NEW_COMMENT_FAILURE
            ],
            endpoint: () => post('comment/', body)
        }
    });
};

export const updateExistingComment = body => (dispatch, getState) => {
    const {announcements: {announcementView: {comments: {pending}}}} = getState();
    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.UPDATE_EXISTING_COMMENT_REQUEST,
                ActionTypes.UPDATE_EXISTING_COMMENT_SUCCESS,
                ActionTypes.UPDATE_EXISTING_COMMENT_FAILURE
            ],
            endpoint: () => put('comment/', body)
        }
    });
};

export const deleteComment = id => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.DELETE_COMMENT_REQUEST,
                ActionTypes.DELETE_COMMENT_SUCCESS,
                ActionTypes.DELETE_COMMENT_FAILURE
            ],
            endpoint: () => remove(`comment/${id}`)
        },
        id: id
    });
};

export const requestABook = body => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.REQUEST_A_BOOK_REQUEST,
                ActionTypes.REQUEST_A_BOOK_SUCCESS,
                ActionTypes.REQUEST_A_BOOK_FAILURE
            ],
            endpoint: () => post('rent/', body)
        }
    });
};