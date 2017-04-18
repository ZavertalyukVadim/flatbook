import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    UPLOAD_AVATAR_REQUEST,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_FAILURE
} from '../actions/image-constants';

const DEFAULT_STATE = {
    uploadedImageId: null,
    uploadedAvatarId: null,
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

    if(action.type === UPLOAD_AVATAR_REQUEST) {
        return {...state, uploadedAvatarId: null}
    }

    if(action.type === UPLOAD_AVATAR_SUCCESS) {
        return {...state, uploadedAvatarId: action.response}
    }

    if(action.type === UPLOAD_AVATAR_FAILURE) {
        return {...state, uploadedAvatarId: null}
    }

    return state;
}
