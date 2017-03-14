let webpackMerge = require('webpack-merge');
let commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
