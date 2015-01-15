'use strict';


module.exports = function (gulp, $, config, deps) {

  var del            = deps['del'];
  var runSequence    = deps['runSequence'];
  var handleErrors   = deps['handleErrors'];

  var dirs    = config.dirs;
  var globs   = config.globs;
  var options = config.pluginOptions;

  // Wipes `build` and `dist` directories before any task.
  gulp.task('dist:clean', function (done) {
    del([ dirs['build'], dirs['dist'] ], done);
  });

  // Process any markup files for distribution.
  gulp.task('dist:views', [ 'dev:build:views' ], function () {
    return gulp.src(dirs['build'] + '/*.html')
      .pipe(handleErrors())
      .pipe($.processhtml())
      .pipe(gulp.dest(dirs['dist']));
  });

  // Copy and minify all style sheet files.
  gulp.task('dist:styles', [ 'dev:build:styles' ], function () {
    return gulp.src(dirs['build'] + '/*.css')
      .pipe(handleErrors())
      .pipe($.minifyCss(options['dist:styles']))
      .pipe($.rename({ extname: '.min.css' }))
      .pipe(gulp.dest(dirs['dist']));
  });

  // Bundle all scripts together for distribution.
  gulp.task(
    'dist:scripts',
    [ 'dev:build:bundle', 'dev:build:scripts' ],
    function () {
      return gulp.src([
        dirs['build'] + '/bundle.js',
        dirs['build'] + '/game.js'
      ])
        .pipe($.sourcemaps.init())
        .pipe($.concat('game.min.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(dirs['dist']));
  });

  // Copy all dependent application assets into the final build directory.
  gulp.task('dist:assets', function () {
    return gulp.src(globs['assets'])
      .pipe(gulp.dest(dirs['dist']));
  });

  // Generate the off-line application cache.
  gulp.task('dist:appcache', function () {
    return gulp.src(globs['assets'])
      .pipe(handleErrors())
      .pipe($.manifest(options['dist:appcache']))
      .pipe(gulp.dest(dirs['dist']));
  });

  // The main distribution task.
  gulp.task('dist', function (done) {
    runSequence('dist:clean', [
      'dist:views',
      'dist:assets',
      'dist:styles',
      'dist:scripts',
      'dist:appcache'
    ], done);
  });

};
