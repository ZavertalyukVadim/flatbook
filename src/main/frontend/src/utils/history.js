import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

export default browserHistory;

export const redirect = path => browserHistory.push(path);
