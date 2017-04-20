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
        data: {
            content: []
        },
        pending: false
    },
    maxPrice: {
        world: {
            data: {},
            pending: false
        },
        country: {
            data: {},
            pending: false
        },
        region: {
            data: {},
            pending: false
        },
        city: {
            data: {},
            pending: false
        }
    }
};

export default (state = DEFAULT_STATE, action) => {

    if (action.type === SEARCH_REQUEST || action.type === ADVANCED_SEARCH_REQUEST) {
        return {...state, searchResult: {...state.searchResult, pending: true}}
    }

    if (action.type === SEARCH_SUCCESS || action.type === ADVANCED_SEARCH_SUCCESS) {
        return {...state, searchResult: {...state.searchResult, data: action.response, pending: false}}
    }

    if (action.type === SEARCH_FAILURE || action.type === ADVANCED_SEARCH_FAILURE) {
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

    if (action.type === GET_WORLD_MAX_PRICE_REQUEST) {
        return {...state, maxPrice: {...state.maxPrice, world: {data: {}, pending: true}}}
    }

    if (action.type === GET_WORLD_MAX_PRICE_SUCCESS) {
        return {...state, maxPrice: {...state.maxPrice, world: {data: action.response, pending: false}}}
    }

    if (action.type === GET_WORLD_MAX_PRICE_FAILURE) {
        return {...state, maxPrice: {...state.maxPrice, world: {data: {}, pending: false}}}
    }

    if (action.type === GET_COUNTRIES_MAX_PRICE_REQUEST) {
        return {...state, maxPrice: {...state.maxPrice, country: {data: {}, pending: true}}}
    }

    if (action.type === GET_COUNTRIES_MAX_PRICE_SUCCESS) {
        return {...state, maxPrice: {...state.maxPrice, country: {data: action.response, pending: false}}}
    }

    if (action.type === GET_COUNTRIES_MAX_PRICE_FAILURE) {
        return {...state, maxPrice: {...state.maxPrice, country: {data: {}, pending: false}}}
    }

    if (action.type === GET_REGIONS_MAX_PRICE_REQUEST) {
        return {...state, maxPrice: {...state.maxPrice, region: {data: {}, pending: true}}}
    }

    if (action.type === GET_REGIONS_MAX_PRICE_SUCCESS) {
        return {...state, maxPrice: {...state.maxPrice, region: {data: action.response, pending: false}}}
    }

    if (action.type === GET_REGIONS_MAX_PRICE_FAILURE) {
        return {...state, maxPrice: {...state.maxPrice, region: {data: {}, pending: false}}}
    }

    if (action.type === GET_CITIES_MAX_PRICE_REQUEST) {
        return {...state, maxPrice: {...state.maxPrice, city: {data: {}, pending: true}}}
    }

    if (action.type === GET_CITIES_MAX_PRICE_SUCCESS) {
        return {...state, maxPrice: {...state.maxPrice, city: {data: action.response, pending: false}}}
    }

    if (action.type === GET_CITIES_MAX_PRICE_FAILURE) {
        return {...state, maxPrice: {...state.maxPrice, city: {data: {}, pending: false}}}
    }

    return state
}
