var gulp         = require('gulp'),
    del          = require('del'),
    handleErrors = require('../util/handleErrors');


gulp.task('clean', function (cb) {
    del([ paths['temp'], paths['product'] ], cb);
});
