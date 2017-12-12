'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Post CSS unit
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');

// autoprefixer
var autoprefixer = require('gulp-autoprefixer');

// css rename
var rename = require('gulp-rename');

// spritesmith
var spritesmith = require('gulp.spritesmith');

// Image Dimensions
var cssImageDimensions = require("gulp-css-image-dimensions");

// other
var fontAwesome = require('node-font-awesome');

// gulp server
// var cors = require('cors');
var connect = require('gulp-connect');

// js uglify
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// html render
var fileinclude = require('gulp-file-include');
 

// bower_components
// var supportForPath = './bower_components/support-for/sass';
var normalizePath = './bower_components/normalize-scss/';
// var susyPath = './bower_components/susy/sass/';
// var resetPath = './bower_components/reset-css/';
// var breakpointPath = './bower_components/breakpoint-sass/stylesheets/';
// var compassMixins = './bower_components/compass-mixins/lib/';
var bootstrapPath = './bower_components/bootstrap-sass/assets/stylesheets/';

// paths
var cssPath = ['../css/**/*.css', '!../css/**/*.min.css'],
    jsPath = ['./js_plugin/**/*.js'],
    jsPathCust = ['./js_cust/**/*.js', '!./js_cust/**/*.default.js'],
    jsPathDefault = ['./js_cust/**/*.default.js'],
    jsAngular = ['./js_ng/**/*.js'],
    sassWatchPath = [
        './scss/**/*.{scss,sass}',
        // supportForPath + '/**/*.{scss,sass}',
        normalizePath + '/**/*.{scss,sass}',
        // susyPath + '/**/*.{scss,sass}',
        // resetPath + '/**/*.{scss,sass}',
        // breakpointPath + '/**/*.{scss,sass}',
        // compassMixins + '/**/*.{scss,sass}',
        bootstrapPath + '/**/*.{scss,sass}',
    ],
    sourcemapsRoot = '../src/scss',
    css = {}, img = {};

    css.path = {}, css.path.output = '../css';
    img.path = {}, img.path.output = '../../images';

// gulp fonts
gulp.task('fonts', function() {
    gulp.src(fontAwesome.fonts)
        .pipe(gulp.dest('../fonts/font-awesome'));

    // gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/**/*.*')
    //     .pipe(gulp.dest('../fonts/bootstrap'));
});

// copy bootstrap variables (if necessity)
// gulp.task('createBootsrapVar', function() {
//     gulp.src(bootstrapPath + 'bootstrap/_variables.scss')
//         .pipe(rename({prefix: '_bootstrap'}))
//         .pipe(gulp.dest('./scss'));
// });


gulp.task('fileinclude', function() {
    gulp.src(['../template/*.html', '!../template/_*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('../'));
});

gulp.task('html', function () {
    gulp.src(['../*.html'])
        .pipe(connect.reload());
});

// sass
gulp.task('sass', function () {
    gulp.src('./scss/**/*.{scss,sass}')
    // Initializes sourcemaps
    .pipe(sourcemaps.init())
    // Converts Sass into CSS with Gulp Sass
    .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                fontAwesome.scssPath,
                // supportForPath,
                normalizePath,
                // susyPath,
                // breakpointPath,
                // resetPath
                // compassMixins,
                bootstrapPath,
            ]
        }).on('error', sass.logError))
    // 轉譯 image-width、image-height
    .pipe(cssImageDimensions(img.path.output))
    // add Prefix in CSS
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    // Writes sourcemaps into the CSS file
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: sourcemapsRoot}))
    // Outputs CSS files in the css folder
    .pipe(gulp.dest(css.path.output));
});

// css mini
gulp.task('mini', function () {
    gulp.src(cssPath)
        .pipe(sourcemaps.init())
        // 再最小化
        .pipe(postcss([cssnano({ zindex: false })]))
        // 將最小化的檔名末端加上.min
        .pipe(rename({suffix: '.min'}))
        // Writes sourcemaps into the CSS file
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: ''}))
        // 把最小化的寫入css folder
        .pipe(gulp.dest(css.path.output))
        .pipe(connect.reload());
});

// Watch scss folder for changes
gulp.task('watch', function() {
    // Watches the scss folder for all .scss and .sass files
    // If any file changes, run the sass task
    var watcher = gulp.watch(sassWatchPath, ['sass']);

    var watcher2 = gulp.watch(cssPath, ['mini']);

    // var watchjs = gulp.watch(jsPath, ['uglify']);
    var watchjs2 = gulp.watch(jsPathCust, ['jsPathCust']);
    // var watchjs3 = gulp.watch(jsPathDefault, ['jsPathDefault']);
    // var watcher4 = gulp.watch(jsAngular, ['jsAngular']);

    var watcher5 = gulp.watch(['../**/*.html'], ['fileinclude', 'html']);

    watcher.on('change', function(event) {
        console.log('SASS Task: File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    watcher2.on('change', function(event) {
        console.log('Mini Task: CSS File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    watchjs2.on('change', function(event) {
        console.log('Mini Task: JS File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    watcher5.on('change', function(event) {
        console.log('Mini Task: HTML File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


// gulp server
gulp.task('connect', function() {
  connect.server({
    root: '../.',
    port: 1234,
    livereload: {
        port: parseInt((Math.random()+1) * 1000),
    }
    // middleware: function (req, res, next) {
    //     res.header('Access-Control-Allow-Origin', config.allowedDomains);
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //     res.header('Access-Control-Allow-Headers', 'Content-Type');

    //   return next();
    //   // return [cors()];
    // }
  });
});

// js combime & uglify
// gulp.task('uglify', function() {
//     gulp.src([
//             // 原生套件，因有使用順序的問題，因此本塊需條列
//             // '../src/jquery-1.11.2.min.js', 
//             'js_plugin/jquery-ui.min.js', 'js_plugin/jquery-ui-datepicker_zh_TW.js',
//             // jquery的tooltip跟bootstrap的打架了，因此rename一下
//             // 'js_plugin/jquery-ui-tooltip-rename.js',
//             // 其他js framework - underscore
//             // 'js_plugin/underscore.js',
//             // 雜湊碼
//             'js_plugin/jquery.md5.js',
//             // moment(時間)
//             'js_plugin/moment.js', 'js_plugin/moment-duration-format.js', 'js_plugin/moment_zh-tw.js',
//             // validate系列
//             'js_plugin/jquery.validate.js', 'js_plugin/jquery.validate-additional-methods.js', 'js_plugin/jquery.validate-messages_zh_TW.js',
//             // 泛用工具包 - bootstrap
//             'js_plugin/bootstrap.js',
//             // 月曆、金額單位
//             // 'js_plugin/daterangepicker.js', 'js_plugin/clndr.js', 
//             'js_plugin/numeral.js',
//             // block UI
//             'js_plugin/jquery.blockUI.js',
//             // 凍結窗格、active nav、輪播
//             'js_plugin/jquery.sticky-kit.js', 'js_plugin/jquery.visualNav.js',
//             // 輪播、點點點
//             'js_plugin/slick.js', // 'js_plugin/jquery.dotdotdot.js',
//             // range slider
//             // 'js_plugin/jquery-ui-slider-pips.js',
//             // lazyload images
//             'js_plugin/jquery.lazyload.js',
//             // font detect
//             'js_plugin/fontdetect.js',
//             // 用來slide的= =
//             // 'js_plugin/jquery.mousewheel.min.js', 'js_plugin/jquery.jscrollpane.min.js',
//             // progress效果
//             // 'js_plugin/jquery-circle-progress.js',

//             // angular additions (click outside then close)
//             // 'bower_components/angular-click-outside/clickoutside.directive.js',

//             // 客製
//             // 'js_cust/**/*.js', '!js_cust/page.js',
//         ])
//         .pipe(sourcemaps.init())
//         .pipe(concat('libs.js'))
//         .pipe(gulp.dest('../js'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('../js'))
//         .pipe(connect.reload())
// });
gulp.task('jsPathCust', function() {
    gulp.src(jsPathCust)
        .pipe(sourcemaps.init())
        .pipe(concat('page.js'))
        .pipe(gulp.dest('../js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../js'))
        .pipe(connect.reload())
});

// gulp fonts
gulp.task('init', ['fonts']);

// Creating a default task
gulp.task('default', ['sass', 'watch', 'connect']);