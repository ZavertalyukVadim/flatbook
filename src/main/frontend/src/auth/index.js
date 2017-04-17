import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS
} from '../actions/user-constants';
import {redirect} from "../utils/history";

export default store => next => action => {
    if (action.type === SIGN_IN_SUCCESS) {
        localStorage.setItem('auth', JSON.stringify({
            logged: true,
            token: `${action.response.token_type} ${action.response.access_token}`
        }));
        redirect('/');
        return next(action);
    }

    if (action.type === SIGN_IN_FAILURE) {
        localStorage.setItem('auth', JSON.stringify({}));
        return next(action);
    }

    if (action.type === SIGN_OUT_SUCCESS) {
        redirect('/');
        localStorage.setItem('auth', JSON.stringify({}));
        return next(action);
    }

    if (action.error === 'unauthorized') {
        localStorage.setItem('auth', JSON.stringify({}));
        redirect('/signin');
        return next(action);
    }

    if (action.type === SIGN_UP_SUCCESS) {
        redirect('/signin');
        return next(action);
    }

    return next(action)
};
