// Taken from https://github.com/epicallan/wordpress-webpack-browsersync

/* eslint default-case:0 */
const path = require('path');
const fs = require('fs-extra');
const browserSync = require('browser-sync').create();
const htmlInjector = require('bs-html-injector');
const webpackConfig = require('./webpack.config');

// ===========================================================================
// CONFIG
// ===========================================================================
const THEME_NAME = 'reacttheme';
const PROXY_TARGET = 'http://reacttheme.local';
const themePath =  path.resolve(__dirname, './');
const PATHS = {
  src: path.resolve(themePath, 'src'),
  build: path.resolve(themePath, 'dist'),
  modules: path.resolve(__dirname, 'node_modules'),
  base: themePath,
};

const bsOptions = {
  port: 3000,
  files: [`${PATHS.build}/*.css`,`${PATHS.build}/*.js`],
  proxy: {
    target: PROXY_TARGET,
  },
  open: true,
};

browserSync.use(htmlInjector, {
  files: `${PATHS.base}/*.php`,
  restrictions: ['#page']
});

// ===========================================================================
// RUN
// ===========================================================================
// clean -> ensure 'style.css' -> run browsersync
fs.emptyDir(PATHS.build, () => (
  fs.ensureFile(path.resolve(PATHS.build, 'style.css'), () => (
    browserSync.init(bsOptions)
  ))
)
);
