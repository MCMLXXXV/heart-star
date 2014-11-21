var gulp   = require('gulp');
var reload = require('browser-sync').reload;

var paths = projectConfig.paths;


gulp.task('html', function () {
  return gulp.src(paths['src'] + '/index.html')
    .pipe(reload({ stream: true }));
});
