import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
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

    return next(action)
};
