var gulp        = require('gulp');
var path        = require('path');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync');


function logChanges (event) {
  gutil.log(
    gutil.colors.green('File ' + event.type + ': ') +
    gutil.colors.magenta(path.basename(event.path))
  );
}


gulp.task('watch', function () {
  gulp.watch(paths['scripts'], [ 'lint', browserSync.reload ])
    .on('change', logChanges);
  gulp.watch(paths['less'], [ 'styles', browserSync.reload ])
    .on('change', logChanges);
  gulp.watch(paths['develop'] + '/index.html', [ 'html', browserSync.reload ])
    .on('change', logChanges);
});
