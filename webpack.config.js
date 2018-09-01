const webpack = require('webpack');

var path = require('path');
module.exports = {
    context: __dirname + '/src',
    entry: './main.js',
    output: {
        path: 'bin',
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
    ],
    devServer: {
        port: 9000,
        proxy: {
            '/**': {
                target: 'http://faganphotos.com:80',
                changeOrigin: true,
                secure: false,
                bypass: function(req, res, proxyOptions) {
                    return req.path === 'model.json';
                }
            }
        }
    }
};