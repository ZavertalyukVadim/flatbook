import {CALL_API, custom} from '../api';
import {getAuthorization} from '../utils/auth';
import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    UPLOAD_AVATAR_REQUEST,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_FAILURE
} from './image-constants';

export const uploadImage = (file) => dispatch => {

    const REQUEST_CONFIG = {
        method: 'POST',
        body: file,
        headers: {...getAuthorization()}
    };

    return dispatch({
        [CALL_API]: {
            types: [
                UPLOAD_IMAGE_REQUEST,
                UPLOAD_IMAGE_SUCCESS,
                UPLOAD_IMAGE_FAILURE
            ],
            endpoint: () => custom('api/photo', REQUEST_CONFIG)
        }
    });
};

export const uploadAvatar = (file) => dispatch => {

    const REQUEST_CONFIG = {
        method: 'POST',
        body: file,
        headers: {...getAuthorization()}
    };

    return dispatch({
        [CALL_API]: {
            types: [
                UPLOAD_AVATAR_REQUEST,
                UPLOAD_AVATAR_SUCCESS,
                UPLOAD_AVATAR_FAILURE
            ],
            endpoint: () => custom('api/profile/photo', REQUEST_CONFIG)
        }
    });
};
