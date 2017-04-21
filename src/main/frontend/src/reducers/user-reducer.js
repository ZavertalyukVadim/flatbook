import * as ActionTypes from '../actions/user-constants';
import {getAuth} from "../utils/auth";

const DEFAULT_STATE = {
    announcements: [],
    favouriteAnnouncements: {
        data: [],
        loaded: false,
        pending: false
    },
    data: {
        phones: [],
        emails: []
    },
    booking: {
        data: [],
        loaded: false,
        pending: false
    },
    auth: {
        pending: false,
        logged: false,
        ...getAuth()
    },
    avatar: {
        loaded: false
    },
    signup: {
        registered: false
    },
    messages: {
        chats: [],
        received: [{
            messageDtoPage: {content: []}
        }]
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

    if (action.type === ActionTypes.GET_FAVOURITE_ANNOUNCEMENTS_REQUEST) {
        return {...state, favouriteAnnouncements: {loaded: false, pending: true}};
    }

    if (action.type === ActionTypes.GET_FAVOURITE_ANNOUNCEMENTS_SUCCESS) {
        return {...state, favouriteAnnouncements: {data: action.response, loaded: true, pending: false}};
    }

    if (action.type === ActionTypes.GET_FAVOURITE_ANNOUNCEMENTS_FAILURE) {
        return {...state, favouriteAnnouncements: {loaded: false, pending: false}};
    }

    if (action.type === ActionTypes.ADD_FAVOURITE_ANNOUNCEMENT_REQUEST) {
        return {...state, favouriteAnnouncements: {...state.favouriteAnnouncements, pending: true}};
    }

    if (action.type === ActionTypes.ADD_FAVOURITE_ANNOUNCEMENT_SUCCESS) {
        return {...state, favouriteAnnouncements: {...state.favouriteAnnouncements, pending: false}};
    }

    if (action.type === ActionTypes.ADD_FAVOURITE_ANNOUNCEMENT_FAILURE) {
        return {...state, favouriteAnnouncements: {...state.favouriteAnnouncements, pending: false}};
    }

    if (action.type === ActionTypes.CHANGE_USER_ANNOUNCEMENT_VISIBILITY_REQUEST) {
        return {...state, announcements: [...state.announcements]};
    }

    if (action.type === ActionTypes.CHANGE_USER_ANNOUNCEMENT_VISIBILITY_SUCCESS) {
        return {
            ...state, announcements: state.announcements.map((item, index) =>
                item.id !== action.response.id ? item : {...action.response})
        };
    }

    if (action.type === ActionTypes.CHANGE_USER_ANNOUNCEMENT_VISIBILITY_FAILURE) {
        return {...state, announcements: [...state.announcements]};
    }

    if (action.type === ActionTypes.DELETE_FAVOURITE_ANNOUNCEMENT_REQUEST) {
        return {...state, favouriteAnnouncements: {...state.favouriteAnnouncements, loaded: false, pending: true}};
    }

    if (action.type === ActionTypes.DELETE_FAVOURITE_ANNOUNCEMENT_SUCCESS) {
        return {
            ...state,
            favouriteAnnouncements: {
                data: state.favouriteAnnouncements.data.filter(obj => obj.id !== action.id),
                loaded: true,
                pending: false
            }
        };
    }

    if (action.type === ActionTypes.DELETE_FAVOURITE_ANNOUNCEMENT_FAILURE) {
        return {...state, favouriteAnnouncements: {...state.favouriteAnnouncements, loaded: false, pending: false}};
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
            announcements: state.announcements.filter(obj => obj.id !== action.id),
            loaded: true
        };
    }

    if (action.type === ActionTypes.DELETE_USER_ANNOUNCEMENTS_FAILURE) {
        return {...state, loaded: false};
    }

    if (action.type === ActionTypes.SIGN_IN_REQUEST) {
        return {...state, auth: {pending: true}};
    }

    if (action.type === ActionTypes.SIGN_IN_SUCCESS) {
        return {
            ...state, auth: {
                pending: false, logged: true, token: `${action.response.token_type} ${action.response.access_token}`
            }
        };
    }

    if (action.type === ActionTypes.SIGN_IN_FAILURE) {
        return {...state, auth: {pending: false, logged: false}};
    }

    if (action.type === ActionTypes.SIGN_OUT_REQUEST) {
        return {...state};
    }

    if (action.type === ActionTypes.SIGN_OUT_SUCCESS) {
        return {...state, auth: {pending: false, logged: false}};
    }

    if (action.type === ActionTypes.SIGN_OUT_FAILURE) {
        return {...state};
    }

    if (action.type === ActionTypes.GET_USER_AVATAR_REQUEST) {
        return {...state};
    }

    if (action.type === ActionTypes.GET_USER_AVATAR_SUCCESS) {
        return {...state, avatar: {loaded: true, id: action.response}};
    }

    if (action.type === ActionTypes.GET_USER_AVATAR_FAILURE) {
        return {...state, avatar: {loaded: false}};
    }

    if (action.type === ActionTypes.SIGN_UP_REQUEST) {
        return {...state};
    }

    if (action.type === ActionTypes.SIGN_UP_SUCCESS) {
        return {...state, signup: {registered: true}};
    }

    if (action.type === ActionTypes.SIGN_UP_FAILURE) {
        return {...state, signup: {registered: false}};
    }

    if (action.type === ActionTypes.GET_USER_BOOKINGS_REQUEST) {
        return {...state, booking: {loaded: false, pending: true}};
    }

    if (action.type === ActionTypes.GET_USER_BOOKINGS_SUCCESS) {
        return {...state, booking: {data: action.response, loaded: true, pending: false}};
    }

    if (action.type === ActionTypes.GET_USER_BOOKINGS_FAILURE) {
        return {...state, booking: {loaded: false, pending: false}};
    }

    if (action.type === ActionTypes.SEND_A_MESSAGE_REQUEST) {
        return {...state};
    }

    if (action.type === ActionTypes.SEND_A_MESSAGE_SUCCESS) {
        return {...state};
    }

    if (action.type === ActionTypes.SEND_A_MESSAGE_FAILURE) {
        return {...state};
    }

    if (action.type === ActionTypes.GET_CHATS_REQUEST) {
        return {...state};
    }

    if (action.type === ActionTypes.GET_CHATS_SUCCESS) {
        return {...state, messages: {...state.messages, chats: action.response}};
    }

    if (action.type === ActionTypes.GET_CHATS_FAILURE) {
        return {...state};
    }

    if (action.type === ActionTypes.GET_MESSAGES_REQUEST) {
        return {...state};
    }

    if (action.type === ActionTypes.GET_MESSAGES_SUCCESS) {
        return {...state, messages: {...state.messages, received: [action.response]}};
    }

    if (action.type === ActionTypes.GET_MESSAGES_FAILURE) {
        return {...state};
    }
    return state;
};
