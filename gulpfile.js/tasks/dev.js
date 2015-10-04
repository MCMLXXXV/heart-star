/*
 * Development tasks.
 * ============================================================================
 */

'use strict';


module.exports = function (gulp, $, config) {

  // Is in development mode?
  var isWatching = false;

  var buffer      = require('vinyl-buffer');
  var source      = require('vinyl-source-stream');
  var browserSync = require('browser-sync').create();

  var handleErrors = $.notify.onError({ message: '<%= error.message %>' });

  var dirs  = config.dirs;
  var globs = config.globs;

  var bundler = require('./helpers/bundler');

  // Bundle the application source code using Browserify.
  gulp.task('dev:scripts', [ 'dev:lint' ], function () {
    return bundler(config.bundle, isWatching)
      .bundle()
      .on('error', handleErrors)
      .pipe(source('game.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(dirs.build))
      .pipe(browserSync.stream());
  });

  // Copy the chosen Phaser build for development.
  gulp.task('dev:copy-phaser', function () {
    return gulp.src(config.phaser)
      .pipe($.rename('phaser.js'))
      .pipe(gulp.dest(dirs.build));
  });

  // Instantiate a live web development server for cross-browser, cross-device
  // testing.
  gulp.task('dev:server', [ 'dev:scripts' ], function () {
    browserSync.init({
      server: {
        baseDir: [
          dirs.static,
          dirs.build
        ]
      },
      ghostMode: false,
      notify: false
    });
  });

  // Monitors files for changes, trigger rebuilds as needed.
  gulp.task('dev:watch', function () {
    isWatching = true;

    gulp.watch(globs.scripts, [ 'dev:scripts' ]);
  });

  // Pass through modified script files and issue warnings about
  // non-conformances.
  gulp.task('dev:lint', function () {
    return gulp.src([ globs.scripts ])
      .pipe($.cached('dev:lint'))
      .pipe($.eslint())
      .pipe($.eslint.format('stylish', process.stderr));
  });

  // The main development task.
  gulp.task('dev', [
    'dev:copy-phaser',
    'dev:server',
    'dev:watch'
  ]);

  // Aliasing `dev` as default task.
  gulp.task('default', [ 'dev' ]);

};
