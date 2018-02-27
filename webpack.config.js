// Adapted from https://github.com/epicallan/wordpress-webpack-browsersync

const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NPMInstallPlugin = require('npm-install-webpack-plugin');

const THEME_NAME = 'reacttheme';
const PROXY_TARGET = 'http://reacttheme.local';
const themePath =  path.resolve(__dirname, './');

const PATHS = {
  src: path.resolve(themePath, 'src'),
  build: path.resolve(themePath, 'dist'),
  modules: path.resolve(__dirname, 'node_modules'),
  base: themePath,
};

const LOADER_INCLUDES = [ PATHS.src];

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const ENV = process.env.NODE_ENV === 'production' ? PRODUCTION : DEVELOPMENT ;

module.exports = function(env) {
  return {
    entry: getEntry(ENV),
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: PATHS.base,
      sourceMapFilename: '[file].map',
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
        {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/},
        {test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/},
        {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader', exclude: /node_modules/},
        {test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader'}
      ]
    },
    plugins: getPlugins(ENV),

    target: 'web'
  };
};

function getEntry(env) {
  const entry = {};
  entry.main = [ path.resolve(PATHS.src, 'js/app.js') ];
  entry.style = path.resolve(PATHS.src, 'scss/main.scss');
  return entry;
}

function getPlugins(env) {
  const plugins = [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(env) // sets ENV constant to development or production
    })
  ];
  switch (env) {
    case PRODUCTION:
    // optimizations
      plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.OccurenceOrderPlugin());
      break;
    case DEVELOPMENT:
      plugins.push(new NPMInstallPlugin({ save: true }));
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }
  plugins.push(new ExtractTextPlugin('style.css'));
  return plugins;
}
