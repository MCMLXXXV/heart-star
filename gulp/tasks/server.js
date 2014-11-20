var gulp        = require('gulp');
var browserSync = require('browser-sync');


gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: [
        paths['develop'],
        paths['static'],
        paths['temp']
      ]
    }
  });
});
