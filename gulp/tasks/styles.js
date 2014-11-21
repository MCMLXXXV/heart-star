var gulp         = require('gulp');
var less         = require('gulp-less');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('styles', function () {
  return gulp.src(paths['less'])
    .pipe(handleErrors())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths['temp']));
});
