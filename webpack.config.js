var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = process.env.NODE_ENV;
var cssFileName = env === 'production' ? 'visual-stack.min.css' : 'visual-stack.css';

var config = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.png$|\.svg$/, loaders: ['url-loader'] },
      { test: /\.eot$|\.ttf$|\.woff(2)?/, loaders: ['url-loader'] }
    ]
  },
  output: {
    library: 'VisualStack',
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'umd react'
  },

  // quiet the log output from the ExtractTextPlugin
  stats: { children: false },

  plugins: [
    new ExtractTextPlugin(cssFileName),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false,
    })
  );
}

module.exports = config;

