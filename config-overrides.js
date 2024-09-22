const {version} = require('./package.json');

module.exports = function override(config) {
    config.plugins = [
        ...config.plugins,
        new (require('webpack')).DefinePlugin({
            'process.env.REACT_APP_VERSION': JSON.stringify(version)
        })
    ];
    return config;
};