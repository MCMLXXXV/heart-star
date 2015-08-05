/*
 * Internal development supporting tasks.
 * ============================================================================
 */

'use strict';


module.exports = function (gulp, $) {

  gulp.task('tasks:lint', function () {
    gulp.src('gulpfile.js/**/*.js')
      .pipe($.eslint({
        useEslintrc: false,
        configFile: 'gulpfile.js/.eslintrc'
      }))
      .pipe($.eslint.format('stylish', process.stderr));
  });

};
