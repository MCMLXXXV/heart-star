var gulp         = require('gulp');
var del          = require('del');
var handleErrors = require('../util/handleErrors');


gulp.task('clean', function (cb) {
  del([ paths['temp'], paths['product'] ], cb);
});
