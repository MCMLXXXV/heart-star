/*
 * Development tasks.
 * ============================================================================
 */

'use strict';


module.exports = function (gulp, $, config) {

  // Is in development mode?
  var isWatching = false;

  var buffer = require('vinyl-buffer');
  var source = require('vinyl-source-stream');

  var browserSync    = require('browser-sync').create();
  var autoprefixer   = require('autoprefixer-core');
  var mainBowerFiles = require('main-bower-files');

  var handleErrors = $.notify.onError({ message: '<%= error.message %>' });

  var dirs  = config.dirs;
  var globs = config.globs;

  var bundler = require('./helpers/bundler')(config.bundle);

  // Compile template views into HTML files.
  gulp.task('dev:build:views', function () {
    var viewsGlobs = globs.views;

    return gulp.src(viewsGlobs.templates)
      .pipe($.hb({
        data: viewsGlobs.data,
        partials: viewsGlobs.partials,
        bustCache: true
      }))
      .pipe($.rename({ extname: '.html' }))
      .pipe(gulp.dest(dirs.build))
      .pipe(browserSync.stream());
  });

  // Compile style sheet templates, prefix proposed and non-standard rules.
  gulp.task('dev:build:styles', function () {
    return gulp.src(globs.styles)
      .pipe($.sourcemaps.init())
      .pipe($.less())
      .on('error', handleErrors)
      .pipe($.postcss([
        autoprefixer()
      ]))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(dirs.build))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  });

  // Compile script files as AMD, bundle them as a single file.
  gulp.task('dev:build:scripts', [ 'dev:lint' ], function () {
    return bundler(isWatching)
      .bundle()
      .on('error', handleErrors)
      .pipe(source('game.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(dirs.build))
      .pipe(browserSync.stream());
  });

  // Concatenates Bower script libraries in a single file.
  gulp.task('dev:build:bundle', function () {
    return gulp.src(mainBowerFiles())
      .pipe($.filter('**/*.js'))
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.concat('bundle.js'))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(dirs.build))
      .pipe(browserSync.stream());
  });

  // Instantiate a live web development server for cross-browser, cross-device
  // testing.
  gulp.task('dev:server', [ 'dev:build' ], function () {
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

    gulp.watch(globs.scripts, [ 'dev:build:scripts' ]);
    gulp.watch(globs.styles,  [  'dev:build:styles' ]);
    gulp.watch([
      globs.views.templates, globs.views.data
    ], [ 'dev:build:views' ]);

    gulp.watch('bower.json', [ 'dev:build:bundle' ]);
  });

  // Pass through modified script files and issue warnings about
  // non-conformances.
  gulp.task('dev:lint', function () {
    return gulp.src([ globs.scripts ])
      .pipe($.cached('dev:lint'))
      .pipe($.eslint())
      .pipe($.eslint.format('stylish', process.stderr));
  });

  // The overall build task.
  gulp.task('dev:build', [
    'dev:build:views',
    'dev:build:bundle',
    'dev:build:styles',
    'dev:build:scripts'
  ]);

  // The main development task.
  gulp.task('dev', [
    'dev:server',
    'dev:watch'
  ]);

  // Aliasing `dev` as default task.
  gulp.task('default', [ 'dev' ]);

};
