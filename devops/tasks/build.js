import gulp from 'gulp';
import { clean } from './clean';
import { styles } from './styles';
import { images } from './images';
import { fonts } from './fonts';
import { scripts } from './scripts';
import { html } from './html';
import { sync } from './sync';

gulp.task('build', gulp.series(clean, gulp.parallel(styles, fonts, images, scripts, html)));
gulp.task('sync', gulp.series(clean, gulp.parallel(styles, fonts, images, html), gulp.parallel(scripts, sync)));
