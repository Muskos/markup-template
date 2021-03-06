import gulp from 'gulp';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';
import { reload } from 'browser-sync';
import paths from '../paths';

gulp.task('watch', () => {
  global.watch = true;

  watch(`${paths.src.styles}/**/*.{scss,css}`, () => {
    runSequence('scss', reload.bind(null, `${paths.dist.styles}/index.css`));
  });

  watch(`${paths.src.pngsprite}/*.png`, () => {
    runSequence('png-sprite', reload);
  });

  watch(`${paths.src.svgsprite}/*`, () => {
    runSequence('svg-sprite', reload);
  });

  watch(`${paths.src.images}/**/*.{png,jpg,gif,svg}`, () => {
    runSequence('images', reload);
  });

  watch(`${paths.src.scripts}/**/*.js`, () => {
    runSequence('scripts:compile');
  });
});