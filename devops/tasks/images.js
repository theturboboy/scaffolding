import gulp from 'gulp';
import path from 'path';
import gulpSize from 'gulp-size';
import gulpChanged from 'gulp-changed';
import { PATHS, IS_WATCH } from '../config';

function compileImages() {
  if (IS_WATCH) {
    watchImages()
  }

  return gulp
    .src(path.join(PATHS.IMAGES_SRC, '**/*'))
    .pipe(gulpChanged(PATHS.IMAGES_DEST))
    .pipe(gulp.dest(PATHS.IMAGES_DEST))
    .pipe(gulpSize({ title: 'images' }))
    .pipe(gulpSize({ title: 'images', gzip: true }));
}

function watchImages() {
  gulp.watch(path.join(PATHS.IMAGES_SRC, '**/*'), gulp.parallel(compileImages))
}

function images() {
  if (IS_WATCH) {
    watchImages();
  }
  return compileImages();
}

export { images };
