import urlResolver, {apiRoot} from './urlResolver';
import {CONTENT_TYPE_JSON} from './const';
import 'isomorphic-fetch';
import {getAuthorization} from "../utils/auth";

export const CALL_API = Symbol('Call API');

const callApi = endpoint => endpoint()
    .then(response => response.json().then(json => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    }));

export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let {endpoint} = callAPI;
    const {types, nextAction} = callAPI;

    const actionWith = data => {
        const finalAction = {...action, ...data};
        delete finalAction[CALL_API];
        return finalAction;
    };

    const [requestType, successType, failureType] = types;
    next(actionWith({type: requestType}));

    return callApi(endpoint).then(
        response => {
            if (typeof nextAction === 'function') {
                nextAction();
            }
            next(actionWith({
                response,
                type: successType
            }));
        },
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    );
};

const GET_CONFIG = {headers: {...getAuthorization()}};
const get = (url, extraParams = {}) =>
    fetch(urlResolver(url, extraParams), {...GET_CONFIG, mode: 'cors', credentials: "include"});

const POST_CONFIG = {
    method: 'POST',
    credentials: "include",
    mode: 'cors',
    headers: {'Content-Type': CONTENT_TYPE_JSON, ...getAuthorization()}
};
const post = (url, body, extraParams = {}, headers = {}) =>
    fetch(urlResolver(url, extraParams), {...POST_CONFIG, ...headers, body: JSON.stringify(body)});

const PUT_CONFIG = {
    method: 'PUT',
    mode: 'cors',
    credentials: "include",
    headers: {'Content-Type': CONTENT_TYPE_JSON, ...getAuthorization()}
};
const put = (url, body = {}, extraParams = {}) =>
    fetch(urlResolver(url, extraParams), {...PUT_CONFIG, body: JSON.stringify(body)});

const REMOVE_CONFIG = {headers: {...getAuthorization()}};
const remove = (url, extraParams = {}) =>
    fetch(urlResolver(url, extraParams), {...REMOVE_CONFIG, method: 'DELETE', mode: 'cors', credentials: "include"});

const custom = (url, config,) =>
    fetch(`${apiRoot()}${url}`, {...config});

export {get, post, put, remove, custom};
