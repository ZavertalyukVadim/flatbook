import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from '../actions/user-constants';

const DEFAULT_STATE = {
    data: {}
};

export default (state = DEFAULT_STATE, action) => {

    if (action.type === GET_USER_REQUEST) {
        return {...state};
    }

    if (action.type === GET_USER_SUCCESS) {
        return {...state};
    }

    if (action.type === GET_USER_FAILURE) {
        return {...state};
    }

    return state;
};
