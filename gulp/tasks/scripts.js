var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    footer       = require('gulp-footer'),
    plumber      = require('gulp-plumber'),
    traceur      = require('gulp-traceur'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync'),
    handleErrors = require('../util/handleErrors');


gulp.task('scripts', [ 'lint' ], function () {
    return gulp.src(paths['scripts'])
        .pipe(handleErrors())
        .pipe(sourcemaps.init())
        .pipe(traceur({
            modules: 'register',
            moduleName: true
        }))
        .pipe(concat('game.js'))
        .pipe(footer(";!function(A){A.start();}(System.get('main')['default']);"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths['temp']));
});
