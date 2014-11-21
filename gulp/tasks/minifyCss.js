var gulp         = require('gulp');
var rename       = require('gulp-rename');
var minifycss    = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('minifyCss', [ 'less' ], function () {
  return gulp.src(paths['temp'] + '/style.css')
    .pipe(handleErrors())
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths['dist']));
});
