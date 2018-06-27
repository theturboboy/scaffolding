import gulp from 'gulp';
import gulpSize from 'gulp-size';
import gulpPlumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import gulpHtmlmin from 'gulp-htmlmin';

import path from 'path';
import {
  PATHS,
  IS_MINIFY,
  IS_WATCH,
  GIT_REV,
} from '../config';

function compileHtml() {
  return gulp
    .src(path.join(PATHS.APP, '**/*.html'))
    .pipe(gulpPlumber())
    .pipe(
      gulpIf(
        IS_MINIFY,
        gulpHtmlmin({
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          processScripts: ['text/template'],
        }),
      ),
    )
    .pipe(gulpPlumber.stop())
    .pipe(gulp.dest(PATHS.BUILD))
    .pipe(gulpSize({ title: 'html', gzip: true }));
}

function watchHtml() {
  gulp.watch(path.join(PATHS.APP, '**/*.html'), gulp.parallel(compileHtml))
}

function html() {
  if (IS_WATCH) {
    watchHtml();
  }
  return compileHtml();
}

export { html }
