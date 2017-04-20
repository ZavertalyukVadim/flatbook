import {CALL_API, get, post} from '../api';
import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    ADVANCED_SEARCH_REQUEST,
    ADVANCED_SEARCH_SUCCESS,
    ADVANCED_SEARCH_FAILURE,
    GET_COUNTRIES_REQUEST,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILURE,
    GET_REGIONS_REQUEST,
    GET_REGIONS_SUCCESS,
    GET_REGIONS_FAILURE,
    GET_CITIES_REQUEST,
    GET_CITIES_SUCCESS,
    GET_CITIES_FAILURE,
    GET_WORLD_MAX_PRICE_REQUEST,
    GET_WORLD_MAX_PRICE_SUCCESS,
    GET_WORLD_MAX_PRICE_FAILURE,
    GET_COUNTRIES_MAX_PRICE_REQUEST,
    GET_COUNTRIES_MAX_PRICE_SUCCESS,
    GET_COUNTRIES_MAX_PRICE_FAILURE,
    GET_REGIONS_MAX_PRICE_REQUEST,
    GET_REGIONS_MAX_PRICE_SUCCESS,
    GET_REGIONS_MAX_PRICE_FAILURE,
    GET_CITIES_MAX_PRICE_REQUEST,
    GET_CITIES_MAX_PRICE_SUCCESS,
    GET_CITIES_MAX_PRICE_FAILURE
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

export const advancedSearch = body => (dispatch, getState) => {
    const {search: {countries: {pending}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                ADVANCED_SEARCH_REQUEST,
                ADVANCED_SEARCH_SUCCESS,
                ADVANCED_SEARCH_FAILURE,
            ],
            endpoint: () => post('search/extended/', body)
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

export const getWorldMaxPrice = () => (dispatch, getState) => {
    const {search: {maxPrice: {world: {pending}}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                GET_WORLD_MAX_PRICE_REQUEST,
                GET_WORLD_MAX_PRICE_SUCCESS,
                GET_WORLD_MAX_PRICE_FAILURE
            ],
            endpoint: () => get('search/world/maxPrice')
        }
    });
};

export const getCountyMaxPrice = id => (dispatch, getState) => {
    const {search: {maxPrice: {country: {pending}}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                GET_COUNTRIES_MAX_PRICE_REQUEST,
                GET_COUNTRIES_MAX_PRICE_SUCCESS,
                GET_COUNTRIES_MAX_PRICE_FAILURE
            ],
            endpoint: () => get(`search/country/${id}/maxPrice`)
        }
    });
};

export const getRegionMaxPrice = id => (dispatch, getState) => {
    const {search: {maxPrice: {region: {pending}}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                GET_REGIONS_MAX_PRICE_REQUEST,
                GET_REGIONS_MAX_PRICE_SUCCESS,
                GET_REGIONS_MAX_PRICE_FAILURE
            ],
            endpoint: () => get(`search/region/${id}/maxPrice`)
        }
    });
};

export const getCityMaxPrice = id => (dispatch, getState) => {
    const {search: {maxPrice: {city: {pending}}}} = getState();

    if (pending) {
        return null;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                GET_CITIES_MAX_PRICE_REQUEST,
                GET_CITIES_MAX_PRICE_SUCCESS,
                GET_CITIES_MAX_PRICE_FAILURE
            ],
            endpoint: () => get(`search/city/${id}/maxPrice`)
        }
    });
};
