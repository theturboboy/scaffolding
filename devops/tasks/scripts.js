import path from 'path';
import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import { WEBPACK_CONFIG_BASE, PATHS } from '../config';

let webpackConfig = {
  ...WEBPACK_CONFIG_BASE,
  entry: {
    app: path.join(PATHS.SCRIPTS_SRC, 'app.js'),
  },
  output: {
    path: path.join(PATHS.SCRIPTS_DEST),
    filename: '[name].js',
  }
};

function scripts() {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(PATHS.SCRIPTS_DEST));
}

export { scripts };
