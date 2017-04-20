import {CALL_API, get} from '../api';
import {
    GET_AMENTIES_REQUEST,
    GET_AMENTIES_SUCCESS,
    GET_AMENTIES_FAILURE
} from './amenity-constants';

export const getAmenity = id => (dispatch, getState) => {
    const {amenity: {pending, loaded}} = getState();

    if (pending || loaded) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                GET_AMENTIES_REQUEST,
                GET_AMENTIES_SUCCESS,
                GET_AMENTIES_FAILURE
            ],
            endpoint: () => get('amenity')
        }
    });
};
