var gulp        = require('gulp');
var runSequence = require('run-sequence');


gulp.task('build', function (done) {
  runSequence('clean', [
    'processHtml',
    'minifyCss',
    'scripts',
    'uglify',
    'processAssets'
  ], done);
});
