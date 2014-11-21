var gulp         = require('gulp');
var del          = require('del');
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('clean', function (cb) {
  del([ paths['temp'], paths['dist'] ], cb);
});
