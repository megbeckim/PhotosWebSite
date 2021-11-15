const webpack = require('webpack');

var path = require('path');
module.exports = {
    mode: 'development',
    context: __dirname,
    entry: './src/main.js',
    output: {
        path: __dirname + '/bin',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                        presets: ['@babel/react', '@babel/env']
                      }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                          sassOptions: {
                            includePaths: [ path.relative(__dirname, 'src') ],
                          },
                        },
                      }
                ],
            }
        ]
    },
    devServer: {
        port: 9000,
        proxy: [
            {
                context: ['/model.json', '/mapData.json', '/albums', '/thumb.php5'],
                target: 'http://faganphotos.com:80',
                changeOrigin: true,
                secure: false
            }
        ]
    },
    devtool: 'source-map'
};