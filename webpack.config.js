const webpack = require('webpack');

var path = require('path');
module.exports = {
    entry: {
        app: ['./src/main.js']
    },
        output: {
        path: './bin',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                    presets: ['es2015']
                  }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
        }),
    ]
};