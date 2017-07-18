const browserSync = require('browser-sync');
const cssmin = require('gulp-cssmin');
const cssnext = require('postcss-cssnext');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const watch = require('gulp-watch');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

gulp.task('browsersync', () => {
     browserSync.init(null, {
         files: ['./docs/**/*'],
         notify: false,
         open: false,
         port: process.env.PORT || 43000,
         server: {
             baseDir: './docs',
         },
     });
});

gulp.task('pug', () => {
    gulp.src('./src/pug/!(_)*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./docs'));
});

gulp.task('webpack', () => {
    gulp.src('./src/scripts/entry.js')
        .pipe(plumber())
        .pipe(webpackStream(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('./docs/js'));
});

gulp.task('stylus', () => {
    gulp.src('./src/stylus/!(_)*.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(postcss([
            cssnext({
                browsers: ['last 1 version'],
            }),
        ]))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./docs/css'));
});

gulp.task('imagemin', () => {
    gulp.src('./src/assets/**/*.(png|jpg)', {
        base: './src/assets',
    })
        .pipe(imagemin())
        .pipe(gulp.dest('./docs'));
});

gulp.task('watch', () => {
    watch(['./src/pug/**/*'], () => {
        gulp.start('pug');
    });
    watch(['./src/stylus/**/*'], () => {
        gulp.start('stylus');
        browserSync.stream();
    });
    watch(['./src/scripts/**/*'], () => {
        gulp.start('webpack');
    });
});

gulp.task('dev', ['browsersync', 'watch', 'pug', 'stylus', 'webpack']);
