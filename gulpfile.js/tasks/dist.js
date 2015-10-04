/*
 * Distribution tasks.
 * ============================================================================
 */

'use strict';


module.exports = function (gulp, $, config) {

  var del = require('del');

  var dirs    = config.dirs;
  var globs   = config.globs;
  var options = config.pluginOptions;

  // Wipes `build` and `dist` directories before any task.
  gulp.task('dist:clean', function (done) {
    del([ dirs.build, dirs.dist ], done);
  });

  // Process any markup files for distribution.
  gulp.task('dist:views', [ 'dev:build:views' ], function () {
    return gulp.src(dirs.build + '/*.html')
      .pipe($.processhtml())
      .pipe(gulp.dest(dirs.dist));
  });

  // Bundle all scripts together for distribution.
  gulp.task(
    'dist:scripts',
    [ 'dev:copy-phaser', 'dev:build:scripts' ],
    function () {
      return gulp.src([
        dirs.build + '/phaser.js',
        dirs.build + '/game.js'
      ])
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.concat('game.min.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.dist));
    }
  );

  // Copy all dependent application assets into the final build directory.
  gulp.task('dist:assets', function () {
    return gulp.src(globs.assets)
      .pipe(gulp.dest(dirs.dist));
  });

  // The main distribution task.
  gulp.task('dist', [ 'dist:clean' ], function (done) {
    gulp.start([
      'dist:views',
      'dist:assets',
      'dist:scripts'
    ], done);
  });

};
