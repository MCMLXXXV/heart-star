var del  = require('del');
var gulp = require('gulp');

var paths = projectConfig.paths;


gulp.task('clean', function (cb) {
  del([ paths['temp'], paths['dist'] ], cb);
});
