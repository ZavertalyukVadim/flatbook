import {isNull} from 'lodash';

export const getAuth = () => {
    const auth = localStorage.getItem('auth');
    return isNull(auth) ? {} : JSON.parse(auth)
};

export const getAuthorization = () => {
    const auth = getAuth();
    return  auth.token ? {'Authorization': auth.token} : {}
};