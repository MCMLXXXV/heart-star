var gulp        = require('gulp');
var browserSync = require('browser-sync');

var paths = projectConfig.paths;


gulp.task('server', [ 'compile' ], function () {
  browserSync({
    server: {
      baseDir: [
        paths['src'],
        paths['static'],
        paths['temp']
      ]
    },

    ghostMode: false,

    notify: false
  });
});
