import {
    GET_AMENTIES_REQUEST,
    GET_AMENTIES_SUCCESS,
    GET_AMENTIES_FAILURE
} from '../actions/amenity-constants';

const DEFAULT_STATE = {
    data: [],
    pending: false,
    loaded: false
};

export default (state = DEFAULT_STATE, action) => {

    if (action.type === GET_AMENTIES_REQUEST){
        return {...state, pending: true};
    }

    if (action.type === GET_AMENTIES_SUCCESS){
        return {...state, data: action.response, pending: false, loaded: true};
    }

    if (action.type === GET_AMENTIES_FAILURE){
        return {...state, data: [], pending: false, loaded: false};
    }

    return state
}
