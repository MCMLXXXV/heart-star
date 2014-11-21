var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('processAssets', function () {
  gulp.src([
    'static/**',
    '!static/bower_components',     // Workaround to ensure both directory
    '!static/bower_components/**'   // and its contents don't get copied.
  ])
    .pipe(handleErrors())
    .pipe(gulp.dest(paths['product']));
});
