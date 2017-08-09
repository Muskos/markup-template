import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => {
  runSequence(
    [
      // 'png-sprite',
      // 'svg-sprite',
      // 'fonts',
      // `${options.templateEngine}`,
      // 'php-files',
      // 'files-menu',
      'scss'
      // 'scripts:compile',
      // 'images',
      // 'components',
      // 'static',
      // 'favicon'
    ],
    // 'livereload',
    'watch'
  );
});