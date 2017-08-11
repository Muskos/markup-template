import gulp from 'gulp';
import favicons from 'gulp-favicons/es5';
import paths from '../paths';
import plumber from 'gulp-plumber';
import errorHandler from '../utils/errorHandler';
import options from '../../options';

gulp.task("favicon", () => {
  return gulp.src(`${paths.baseSrc}/favicon.png}`).pipe(favicons({
    appName: options.appName,
    appDescription: options.description,
    developerName: options.developerName,
    developerURL: options.developerURL,
    background: "#fff",
    lang: options.lang,
    path: "/",
    url: options.url,
    display: "standalone",
    orientation: "portrait",
    start_url: "/?homescreen=1",
    version: 1.0,
    logging: false,
    online: false,
    html: "index.html",
    pipeHTML: true,
    replace: true
  }))
    // todo
    // .on("error", plumber({
    //   errorHandler
    // }))
    .pipe(gulp.dest(`${paths.baseDist}/favicon`));
});