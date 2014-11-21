var gulp        = require('gulp');
var browserSync = require('browser-sync');

var paths = projectConfig.paths;


gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: [
        paths['src'],
        paths['static'],
        paths['temp']
      ]
    }
  });
});
