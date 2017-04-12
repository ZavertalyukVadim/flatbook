import * as ActionTypes from '../actions/announcement-constants';

const DEFAULT_STATE = {
    announcements: {
        data:[],
        loaded: false,
        pending: false
    },
    announcementView: {
        data:{},
        loaded: false,
        pending: false
    },
    loaded: false,
    pending: false,
    uploaded: {
        data: {},
        pending: false
    }
};

export default (state = DEFAULT_STATE, action) => {

    if (action.type === ActionTypes.GET_ALL_ANNOUNCEMENTS_REQUEST) {
        return {...state, announcements: {loaded: false, pending: true}};
    }

    if (action.type === ActionTypes.GET_ALL_ANNOUNCEMENTS_SUCCESS) {
        return {...state, announcements: {data: action.response, loaded: true, pending: false}};
    }

    if (action.type === ActionTypes.GET_ALL_ANNOUNCEMENTS_FAILURE) {
        return {...state, announcements: {loaded: false, pending: false}}
    }

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_BY_ID_REQUEST) {
        return {...state, announcementView: {loaded: false, pending: true}};
    }

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_BY_ID_SUCCESS) {
        return {...state, announcementView: {data: action.response, loaded: true, pending: false}};
    }

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_BY_ID_FAILURE) {
        return {...state, announcementView: {loaded: false, pending: false}}
    }

    if (action.type === ActionTypes.ADD_NEW_ANNOUNCEMENT_REQUEST) {
        return {...state, uploaded: {...state.uploaded, pending: true}};
    }

    if (action.type === ActionTypes.ADD_NEW_ANNOUNCEMENT_SUCCESS) {
        return {...state, uploaded: {...state.uploaded, data: action.response, pending: false}}
    }

    if (action.type === ActionTypes.ADD_NEW_ANNOUNCEMENT_FAILURE) {
        return {...state, uploaded: {...state.uploaded, data: {}, pending: false}};
    }

    if (action.type === ActionTypes.UPDATE_ANNOUNCEMENT_REQUEST) {
        return {...state, uploaded: {...state.uploaded, pending: true}};
    }

    if (action.type === ActionTypes.UPDATE_ANNOUNCEMENT_SUCCESS) {
        return {...state, uploaded: {...state.uploaded, data: action.response}};
    }

    if (action.type === ActionTypes.UPDATE_ANNOUNCEMENT_FAILURE) {
        return {...state, uploaded: {...state.uploaded, data: {}, pending: false}};
    }

    return state;
};
