import gulp from 'gulp';
import path from 'path';
import gulpSize from 'gulp-size';
import gulpChanged from 'gulp-changed';
import { PATHS, IS_WATCH } from '../config';

function compileFonts() {
  return gulp
    .src(PATHS.FONTS_SRC)
    .pipe(gulpChanged(PATHS.FONTS_DEST))
    .pipe(gulp.dest(PATHS.FONTS_DEST))
    .pipe(gulpSize({ title: 'fonts' }))
    .pipe(gulpSize({ title: 'fonts', gzip: true }));
}

function watchFonts() {
  gulp.watch(path.join(PATHS.FONTS_SRC, '**/*'), gulp.parallel(compileFonts))
}

function fonts() {
  if (IS_WATCH) {
    watchFonts();
  }
  return compileFonts();
}

export { fonts };
