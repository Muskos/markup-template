require('babel-core/register');
require('require-dir')('./gulp/tasks', { recurse: true });

// import gulp from 'gulp';
// import connect from 'gulp-connect-php';
// import browserSync from 'browser-sync';
// import uglify from 'gulp-uglify';
// import header from 'gulp-header';
// import rename from 'gulp-rename';
// import concat from 'gulp-concat';
// import favicons from "gulp-favicons/es5";
// import gulpUtil from 'gulp-util';
//
// const banner = [
//   '/*!\n' +
//   ' * @author Aleksey Makas\n' +
//   ' */',
//   '\n'
// ].join('');
//
// // js
// gulp.task('js', () => {
//   gulp.src('src/js/scripts.js')
//   // .pipe(sourcemaps.init())
//   // .pipe(jshint('.jshintrc'))
//   // .pipe(jshint.reporter('default'))
//   // .pipe(header(banner))
//     .pipe(gulp.dest('dist/js'))
//     .pipe(uglify())
//     .pipe(concat('script.js'))
//     .pipe(header(banner))
//     .pipe(rename({suffix: '.min'}))
//     // .pipe(sourcemaps.write())
//     .pipe(gulp.dest('dist/js'))
//     .pipe(browserSync.reload({stream: true, once: true}));
// });
//
// // icon sprite
// gulp.task('png-sprite', () => {
//   const spriteData = gulp.src('src/png-sprite/*.png')
//     .pipe(spritesmith({
//       imgName: 'sprite.png',
//       cssName: 'sprite.css',
//       imgPath: '../image/sprite.png'
//     }));
//   spriteData.img.pipe(gulp.dest('dist/image/'));
//   spriteData.css.pipe(gulp.dest('src/scss/tmp/'));
// });
// gulp.task('buid-sprite-style', ['png-sprite'], () => {
//   return gulp.src([
//     'src/scss/tmp/sprite.css'
//   ])
//     .pipe(rename('sprite.scss'))
//     .pipe(gulp.dest("src/scss/common/"));
// });
//
// // gulp.task("favicon", () => {
// //   return gulp.src("src/favicon/favicon.png").pipe(favicons({
// //     appName: "Эргамин-Фит Профессиональное питание для спортсменов",
// //     appDescription: "Эргамин-Фит Профессиональное питание для спортсменов",
// //     developerName: "imwell.im",
// //     developerURL: "http://imwell.im/",
// //     background: "#fff",
// //     lang: "ru-RU",
// //     path: "/favicon/",
// //     url: "http://imwell.im/",
// //     display: "standalone",
// //     orientation: "portrait",
// //     start_url: "/?homescreen=1",
// //     version: 1.0,
// //     logging: false,
// //     online: false,
// //     html: "index.html",
// //     pipeHTML: true,
// //     replace: true
// //   }))
// //     .on("error", gulpUtil.log)
// //     .pipe(gulp.dest("dist/favicon/"));
// // });
//
// gulp.task('default', ['js', 'browser-sync'], () => {
//   gulp.watch("src/js/*.js", ['js']);
//   gulp.watch("src/png-sprite/*.png", ['buid-sprite-style'])
//   gulp.watch("*.html", ['bs-reload']);
// });
//
// gulp.task('production', ['buid-sprite-style', 'js']);