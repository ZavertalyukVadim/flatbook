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
} from '../actions/search-constants';

const DEFAULT_STATE = {
    countries: {
        data: [],
        loaded: false,
        pending: false
    },
    regions: {
        data: [],
        pending: false
    },
    cities: {
        data: [],
        pending: false
    },
    searchResult: {
        data: [],
        pending: false
    }
};

export default (state = DEFAULT_STATE, action) => {

    if (action.type === SEARCH_REQUEST) {
        return {...state, searchResult: {...state.searchResult, pending: true}}
    }

    if (action.type === SEARCH_SUCCESS) {
        return {...state, searchResult: {...state.searchResult, data: action.response, pending: false}}
    }

    if (action.type === SEARCH_FAILURE) {
        return {...state, searchResult: {...state.searchResult, data: [], pending: false}}
    }

    if (action.type === GET_COUNTRIES_REQUEST) {
        return {...state, countries: {...state.countries, pending: true}}
    }

    if (action.type === GET_COUNTRIES_SUCCESS) {
        return {...state, countries: {...state.countries, data: action.response, loaded: true, pending: false}}
    }

    if (action.type === GET_COUNTRIES_FAILURE) {
        return {...state, countries: {...state.countries, data: [], loaded: false, pending: false}}
    }

    if (action.type === GET_REGIONS_REQUEST) {
        return {...state, regions: {...state.regions, pending: true}}
    }

    if (action.type === GET_REGIONS_SUCCESS) {
        return {...state, regions: {...state.regions, data: action.response, pending: false}}
    }

    if (action.type === GET_REGIONS_FAILURE) {
        return {...state, regions: {...state.regions, data: [], pending: false}}
    }

    if (action.type === GET_CITIES_REQUEST) {
        return {...state, cities: {...state.cities, pending: true}}
    }

    if (action.type === GET_CITIES_SUCCESS) {
        return {...state, cities: {...state.cities, data: action.response, pending: false}}
    }

    if (action.type === GET_CITIES_FAILURE) {
        return {...state, cities: {...state.cities, data: [], pending: false}}
    }

    return state
}
