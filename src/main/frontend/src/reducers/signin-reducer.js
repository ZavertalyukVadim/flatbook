import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILTURE
} from '../actions/signin-constants';

const DEFAULT_STATE = {
    logged: false
};

export default (state = DEFAULT_STATE, action) => {

    if (action.type === SIGN_IN_REQUEST) {
        return {...state};
    }

    if (action.type === SIGN_IN_SUCCESS) {
        return {...state, logged: true};
    }

    if (action.type === SIGN_IN_FAILTURE) {
        return {...state};
    }

    return state;
};
