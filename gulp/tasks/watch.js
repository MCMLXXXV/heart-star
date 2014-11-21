var gulp   = require('gulp');
var path   = require('path');
var gutil  = require('gulp-util');
var reload = require('browser-sync').reload;

var paths = projectConfig.paths;


function logChanges (event) {
  gutil.log(
    gutil.colors.green('File ' + event.type + ': ') +
    gutil.colors.magenta(path.basename(event.path))
  );
}


gulp.task('watch', function () {
  gulp.watch(paths['scripts'], [ 'lint', reload ])
    .on('change', logChanges);
  gulp.watch(paths['less'], [ 'styles', reload ])
    .on('change', logChanges);
  gulp.watch(paths['src'] + '/index.html', [ 'html', reload ])
    .on('change', logChanges);
});
