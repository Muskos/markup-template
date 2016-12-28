var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    // jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano');
    // sourcemaps = require('gulp-sourcemaps');
    // package = require('./package.json');


var banner = [
  '/*!\n' +
  ' * @author Aleksey Makas\n' +
  ' */',
  '\n'
].join('');

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    // .pipe(sourcemaps.init())
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(header(banner))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(header(banner))
    .pipe(rename({ suffix: '.min' }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// icon sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('src/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            imgPath: '/dist/img/sprite.png'
        }));
    spriteData.img.pipe(gulp.dest('dist/img/'));
    spriteData.css.pipe(gulp.dest('src/scss/tmp/'));
});

// gulp.task('treba_compile_sprite', ['treba_create_sprite'],function(){
//     return gulp.src([
//             'treba/sass/tmp/sprite.css'
//         ])
//         .pipe(rename('treba_sprite.scss'))
//         .pipe(gulp.dest("treba/sass/common/"));
// });
gulp.task('copy-html', function () {
    return gulp.src(['src/html/index.html'], {
        base: 'src/html'
    }).pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy-html', 'css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});