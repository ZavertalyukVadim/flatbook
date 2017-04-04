import {CALL_API, get, post} from '../api';
import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    GET_COUNTRIES_REQUEST,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILURE,
    GET_REGIONS_REQUEST,
    GET_REGIONS_SUCCESS,
    GET_REGIONS_FAILURE,
    GET_CITIES_REQUEST,
    GET_CITIES_SUCCESS,
    GET_CITIES_FAILURE
} from './search-constants';

export const search = body => (dispatch, getState) => {
    const {search: {countries: {pending}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                SEARCH_REQUEST,
                SEARCH_SUCCESS,
                SEARCH_FAILURE
            ],
            endpoint: () => post('search/', body)
        }
    });
};

export const getCountries = () => (dispatch, getState) => {
    const {search: {countries: {loaded, pending}}} = getState();

    if (loaded || pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                GET_COUNTRIES_REQUEST,
                GET_COUNTRIES_SUCCESS,
                GET_COUNTRIES_FAILURE
            ],
            endpoint: () => get('search/countries')
        }
    });
};

export const getRegions = id => (dispatch, getState) => {
    const {search: {regions: {pending}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                GET_REGIONS_REQUEST,
                GET_REGIONS_SUCCESS,
                GET_REGIONS_FAILURE
            ],
            endpoint: () => get(`search/regions/${id}`)
        }
    });
};

export const getCities = id => (dispatch, getState) => {
    const {search: {cities: {pending}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                GET_CITIES_REQUEST,
                GET_CITIES_SUCCESS,
                GET_CITIES_FAILURE
            ],
            endpoint: () => get(`search/cities/${id}`)
        }
    });
};
