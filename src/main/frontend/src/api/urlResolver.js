const apiRoot = () => process.env.NODE_ENV === 'production' ? `${location.origin}/` : 'http://localhost:8080/';

export default (url, extraParams) =>
    `${apiRoot()}${url}?${Object.entries(extraParams).map(([key, value]) => `${key}=${String(value)}`).join('&')}`;
