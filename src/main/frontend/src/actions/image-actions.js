import {CALL_API, custom} from '../api';
import {getAuthorization} from '../utils/auth';
import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE
} from './image-constants';

export const uploadImage = (file, type) => dispatch => {

    const url = type ? `${type}/photo` : 'photo';

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
            endpoint: () => custom(`api/${url}`, REQUEST_CONFIG)
        }
    });
};
