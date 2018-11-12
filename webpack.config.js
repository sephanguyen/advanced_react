const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  resolve: {
    modules: [path.resolve('./lib'), path.resolve('./node_modules')]
  },
  // entry: ['@babel/polyfill', './lib/renderers/dom.js'],
  entry: {
    app: ['./lib/renderers/dom.js']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: '!!raw-loader!' + path.join(__dirname, 'views/index.ejs'),
      filename: 'index.ejs'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;
