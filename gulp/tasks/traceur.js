var gulp         = require('gulp');
var concat       = require('gulp-concat');
var footer       = require('gulp-footer');
var plumber      = require('gulp-plumber');
var traceur      = require('gulp-traceur');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('traceur', [ 'lint' ], function () {
  return gulp.src(paths['scripts'])
    .pipe(handleErrors())
    .pipe(sourcemaps.init())
    .pipe(traceur(projectConfig.traceurOptions))
    .pipe(concat('game.js'))
    .pipe(footer(";!function(A){A.start();}(System.get('main')['default']);"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths['temp']));
});
