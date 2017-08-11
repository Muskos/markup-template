import gulp from 'gulp';
import paths from '../paths';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import tinypng from 'gulp-tinypng-extended';
import runSequence from 'run-sequence';
import options from '../../options';

gulp.task('images:copy', () => {
  return gulp
    .src(`${paths.src.images}/**/*.{png,jpg,gif,svg}`)
    .pipe(cached())
    .pipe(gulp.dest(paths.dist.images));
});

gulp.task('images:tiny', () => {
  return gulp.src(`${paths.dist.images}/*.{png,jpg}`)
    .pipe(plumber())
    .pipe(tinypng({
      key: options.tinyKey,
      sigFile: `${paths.dist.images}/.tinypng-sigs`,
      log: true
    }))
    .pipe(gulp.dest(paths.dist.images));
});

gulp.task('images', () => {
  runSequence(
    [
      'images:copy',
      'images:tiny'
    ]
  )
});