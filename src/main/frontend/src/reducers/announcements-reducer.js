import * as ActionTypes from '../actions/announcement-constants';

const DEFAULT_STATE = {
    announcements: {
        data: [],
        loaded: false,
        pending: false
    },
    announcementView: {
        data: {},
        comments: {
            data: [],
            loaded: false,
            pending: false
        }
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
        return {...state, announcements: {...state.announcements, loaded: false, pending: true}};
    }

    if (action.type === ActionTypes.GET_ALL_ANNOUNCEMENTS_SUCCESS) {
        return {
            ...state,
            announcements: {...state.announcements, data: action.response.content, loaded: true, pending: false}
        };
    }

    if (action.type === ActionTypes.GET_ALL_ANNOUNCEMENTS_FAILURE) {
        return {...state, announcements: {...state.announcements, loaded: false, pending: false}}
    }

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_BY_ID_REQUEST) {
        return {...state, announcementView: {...state.announcementView, loaded: false, pending: true}};
    }

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_BY_ID_SUCCESS) {
        return {
            ...state,
            announcementView: {...state.announcementView, data: action.response, loaded: true, pending: false}
        };
    }

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_BY_ID_FAILURE) {
        return {...state, announcementView: {...state.announcementView, loaded: false, pending: false}}
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

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_COMMENTS_REQUEST) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, pending: true, loaded: false}
            }
        };
    }

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_COMMENTS_SUCCESS) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, data: action.response, pending: false, loaded: true}
            }
        };
    }

    if (action.type === ActionTypes.GET_ANNOUNCEMENT_COMMENTS_FAILURE) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, pending: false, loaded: false}
            }
        }
    }

    if (action.type === ActionTypes.POST_NEW_COMMENT_REQUEST) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, pending: true, loaded: false}
            }
        };
    }

    if (action.type === ActionTypes.POST_NEW_COMMENT_SUCCESS) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {
                    ...state.announcementView.comments,
                    data: [...state.announcementView.comments.data, action.response],
                    pending: false,
                    loaded: true
                }
            }
        };
    }

    if (action.type === ActionTypes.POST_NEW_COMMENT_FAILURE) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, pending: false, loaded: false}
            }
        }
    }


    if (action.type === ActionTypes.UPDATE_EXISTING_COMMENT_REQUEST) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, pending: true, loaded: false}
            }
        };
    }

    if (action.type === ActionTypes.UPDATE_EXISTING_COMMENT_SUCCESS) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {
                    ...state.announcementView.comments,
                    data: state.announcementView.comments.data.map((item, index) =>
                        item.id !== action.response.id ? item : {...item, ...action.response}),
                    pending: false,
                    loaded: true
                }
            }
        };
    }

    if (action.type === ActionTypes.UPDATE_EXISTING_COMMENT_FAILURE) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, pending: false, loaded: false}
            }
        }
    }



    if (action.type === ActionTypes.DELETE_COMMENT_REQUEST) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, pending: true, loaded: false}
            }
        };
    }

    if (action.type === ActionTypes.DELETE_COMMENT_SUCCESS) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {
                    ...state.announcementView.comments,
                    data: state.announcementView.comments.data.filter(item => item.id !== action.id),
                    pending: false,
                    loaded: true
                }
            }
        };
    }

    if (action.type === ActionTypes.DELETE_COMMENT_FAILURE) {
        return {
            ...state,
            announcementView: {
                ...state.announcementView,
                comments: {...state.announcementView.comments, pending: false, loaded: false}
            }
        }
    }
    return state;
};

