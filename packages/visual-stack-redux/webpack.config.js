var webpack = require('webpack');
var env = process.env.NODE_ENV;

var config = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: "VisualStackRedux",
    libraryTarget: "umd"
  },
  externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'redux': 'Redux',
      'redux-actions': 'ReduxActions',
      '@cjdev/visual-stack': 'VisualStack'
  },
  plugins: [
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
