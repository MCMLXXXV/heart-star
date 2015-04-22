'use strict';


module.exports = function (gulp, $) {

  gulp.task('tasks:lint', function () {
    gulp.src('./gulpfile.js/**/*.js')
      .pipe($.jshint('.jshintrc.tasks'))
      .pipe($.jshint.reporter('jshint-stylish'));
  });

};
