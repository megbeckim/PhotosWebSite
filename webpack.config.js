const webpack = require('webpack');

var path = require('path');
module.exports = {
    context: __dirname + '/src',
    entry: {
        app: ['./main.js']
    },
    output: {
        path: './bin',
        publicPath: '/assets',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                        presets: ['es2015']
                      }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
            }
        ]
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