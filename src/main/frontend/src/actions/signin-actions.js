import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILTURE
} from './signin-constants';
import {TEST} from '../test-middleware';

export const signin = user => dispatch =>
    dispatch({
        [TEST]: {
            types: [
                SIGN_IN_REQUEST,
                SIGN_IN_SUCCESS,
                SIGN_IN_FAILTURE
            ],
            user: user
        }
    });
