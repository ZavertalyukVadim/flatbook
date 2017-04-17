import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE
} from '../actions/image-constants';

const DEFAULT_STATE = {
    uploadedImageId: null
};

export default (state = DEFAULT_STATE, action) => {

    if(action.type === UPLOAD_IMAGE_REQUEST) {
        return {...state, uploadedImageId: null}
    }

    if(action.type === UPLOAD_IMAGE_SUCCESS) {
        return {...state, uploadedImageId: action.response}
    }

    if(action.type === UPLOAD_IMAGE_FAILURE) {
        return {...state, uploadedImageId: null}
    }

    return state;
}
