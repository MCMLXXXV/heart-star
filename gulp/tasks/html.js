var gulp        = require('gulp');
var browserSync = require('browser-sync');

var paths = projectConfig.paths;


gulp.task('html', function () {
  return gulp.src(paths['develop'] + '/index.html')
    .pipe(gulp.dest(paths['temp']));
});
