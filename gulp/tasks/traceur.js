var gulp         = require('gulp');
var concat       = require('gulp-concat');
var footer       = require('gulp-footer');
var traceur      = require('gulp-traceur');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');

var paths = projectConfig.paths;


gulp.task('traceur', [ 'jshint' ], function () {
  return gulp.src(paths['scripts'])
    .pipe(handleErrors())
    .pipe(sourcemaps.init())
    .pipe(traceur(projectConfig.traceurOptions))
    .pipe(concat('game.js'))
    .pipe(footer(";!function(A){A.start();}(System.get('main')['default']);"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths['temp']));
});
