if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod.js');
} else if (process.env.NODE_ENV === 'development') {
    module.exports = require('./configureStore.dev.js');
} else {
    throw new Error('Unrecognized node environment');
}
