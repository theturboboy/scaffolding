import gulp from 'gulp';
import path from 'path';
import gulpPlumber from 'gulp-plumber';
import stylus from 'gulp-stylus';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';
import gulpSize from 'gulp-size';
import { IS_MINIFY, IS_DEBUG, IS_WATCH, PATHS } from '../config';

function compileStyles() {
  return gulp
    .src(path.join(PATHS.STYLES_SRC, 'styles.styl'))
    .pipe(gulpPlumber())
    .pipe(gulpIf(IS_DEBUG, sourcemaps.init()))
    .pipe(stylus({
      compress: IS_MINIFY
    }))
    .pipe(gulpIf(IS_DEBUG, sourcemaps.write()))
    .pipe(gulpPlumber.stop())
    .pipe(gulp.dest(PATHS.STYLES_DEST))
    .pipe(gulpSize({ title: 'styles' }))
    .pipe(gulpSize({ title: 'styles', gzip: true }));
}

function watchStyles() {
  gulp.watch(path.join(PATHS.STYLES_SRC, '**/*'), gulp.parallel(styles));
}

function styles() {
  if (IS_WATCH) {
    watchStyles();
  }
  return compileStyles();
}

export { styles };
