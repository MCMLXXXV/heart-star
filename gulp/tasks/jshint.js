var gulp         = require('gulp');
var cache        = require('gulp-cached');
var jshint       = require('gulp-jshint');
var reload       = require('browser-sync').reload;
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('jshint', function () {
  return gulp.src([ paths['scripts'] ])
    .pipe(handleErrors())
    .pipe(cache('jshint'))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(reload({ stream: true }));
});