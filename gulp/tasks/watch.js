var gulp   = require('gulp');
var path   = require('path');
var gutil  = require('gulp-util');

var paths = projectConfig.paths;


gulp.task('watch', function () {
  gulp.watch(paths['scripts'],             [ 'jshint' ]);
  gulp.watch(paths['less'],                [ 'less' ]);
  gulp.watch(paths['src'] + '/index.html', [ 'html' ]);
});
