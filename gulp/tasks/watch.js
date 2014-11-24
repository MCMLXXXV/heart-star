var gulp = require('gulp');

var paths = projectConfig.paths;


gulp.task('watch', function () {
  gulp.watch(paths['scripts'],             [ 'jshint' ]);
  gulp.watch(paths['less'],                [ 'less' ]);
  gulp.watch(paths['src'] + '/index.html', [ 'html' ]);
});
