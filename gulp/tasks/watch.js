var gulp   = require('gulp');
var path   = require('path');
var gutil  = require('gulp-util');

var paths = projectConfig.paths;


function logChanges (event) {
  gutil.log(
    gutil.colors.green('File ' + event.type + ': ') +
    gutil.colors.magenta(path.basename(event.path))
  );
}


gulp.task('watch', function () {
  gulp.watch(paths['scripts'], [ 'jshint' ])
    .on('change', logChanges);
  gulp.watch(paths['less'], [ 'less' ])
    .on('change', logChanges);
  gulp.watch(paths['src'] + '/index.html', [ 'html' ])
    .on('change', logChanges);
});
