const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
          test: /\.scss$/i,
          use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
        server: 'https',
        port: 9000,
        proxy: [
            {
                context: ['/model.json', '/mapData.json', '/albums', '/thumb.php5'],
                target: 'https://faganphotos.com',
                changeOrigin: true,
                secure: true,
                headers: {
                    Connection: 'Keep-alive'
                }
            }
        ]
  }
};