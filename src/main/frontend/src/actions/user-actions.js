import {CALL_API, get} from '../api';
import * as ActionTypes from './user-constants';

export const getUser = id => (dispatch, getState) => {
    const {user: {pending}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.GET_USER_REQUEST,
                ActionTypes.GET_USER_SUCCESS,
                ActionTypes.GET_USER_FAILURE
            ],
            endpoint: () => get('profile/2')
        }
    });
};

export const signin = user => dispatch =>
    dispatch({
        [CALL_API]: {
            types: [
                ActionTypes.SIGN_IN_REQUEST,
                ActionTypes.SIGN_IN_SUCCESS,
                ActionTypes.SIGN_IN_FAILURE
            ],
            user: user
        }
    });
