const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: ['babel-polyfill', './src/popup.jsx'],
    background: ['babel-polyfill', './src/background.js'],
    options: ['babel-polyfill', './src/options.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      // We use Babel to transpile JSX
      {
        test: /\.js[x]$/,
        include: [path.resolve(__dirname, './src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react'],
        },
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader?limit=100000',
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?limit=100000', {
            loader: 'img-loader',
            options: {
              enabled: true,
              optipng: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // create CSS file with all used styles
    new ExtractTextPlugin('bundle.css'),
    // create popup.html from template and inject styles and script bundles
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['options'],
      filename: 'options.html',
      template: './src/options.html',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
      template: './src/popup.html',
    }),
    // copy extension manifest and icons
    new CopyWebpackPlugin([
      {
        from: './src/manifest.json',
      }, {
        context: './src',
        from: 'icon-**',
      },
    ]),
  ],
};
