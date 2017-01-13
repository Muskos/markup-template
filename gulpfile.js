var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    // jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    favicons = require("gulp-favicons/es5"),
    gulpUtil = require('gulp-util');
    // sourcemaps = require('gulp-sourcemaps');
    // package = require('./package.json');


var banner = [
  '/*!\n' +
  ' * @author Aleksey Makas\n' +
  ' */',
  '\n'
].join('');

// sass & css
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

// js
gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    // .pipe(sourcemaps.init())
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    // .pipe(header(banner))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(header(banner))
    .pipe(rename({ suffix: '.min' }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

// for frontend developer only
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
gulp.task('png-sprite', function () {
    var spriteData = gulp.src('src/png-sprite/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            imgPath: '../image/sprite.png',
        }));
    spriteData.img.pipe(gulp.dest('dist/image/'));
    spriteData.css.pipe(gulp.dest('src/scss/tmp/'));
});

gulp.task('buid-sprite-style', ['png-sprite'],function(){
    return gulp.src([
            'src/scss/tmp/sprite.css'
        ])
        .pipe(rename('sprite.scss'))
        .pipe(gulp.dest("src/scss/common/"));
});

gulp.task("favicon", function () {
    return gulp.src("src/favicon/favicon.png").pipe(favicons({
        appName: "Эргамин-Фит Профессиональное питание для спортсменов",
        appDescription: "Эргамин-Фит Профессиональное питание для спортсменов",
        developerName: "imwell.im",
        developerURL: "http://imwell.im/",
        background: "#fff",
        lang: "ru-RU",
        path: "/favicon/",
        url: "http://imwell.im/",
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
    .on("error", gulpUtil.log)
    .pipe(gulp.dest("dist/favicon/"));
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("src/png-sprite/*.png", ['buid-sprite-style'])
    gulp.watch("*.html", ['bs-reload']);
});

gulp.task('production', ['buid-sprite-style', 'css', 'js']);