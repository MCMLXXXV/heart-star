var gulp         = require('gulp');
var less         = require('gulp-less');
var concat       = require('gulp-concat');
var reload       = require('browser-sync').reload;
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('less', function () {
  return gulp.src(paths['less'])
    .pipe(handleErrors())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths['temp']))
    .pipe(reload({ stream: true }));
});
