var gulp         = require('gulp');
var jshint       = require('gulp-jshint');
var reload       = require('browser-sync').reload;
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('lint', function () {
  return gulp.src([ paths['scripts'] ])
    .pipe(handleErrors())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(reload());
});
