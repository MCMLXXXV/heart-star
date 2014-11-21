var gulp         = require('gulp');
var gutil        = require('gulp-util');
var processhtml  = require('gulp-processhtml');
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('processHtml', function () {
  return gulp.src(paths['src'] + '/index.html')
    .pipe(handleErrors())
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest(paths['dist']));
});
