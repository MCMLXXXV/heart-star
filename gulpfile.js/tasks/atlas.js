'use strict';


module.exports = function (gulp, $, config) {

  var dirs = config.dirs;

  function atlas (name) {
    return function () {
      var spriteData = gulp.src('resources/raw-assets/' + name + '/*.png')
        .pipe($.spritesmith({
          imgName: name + '.png',
          cssName: name + '.js',
          cssTemplate: 'resources/raw-assets/atlas.template',
          padding: 2
        }));

      spriteData.img.pipe(gulp.dest(dirs.assets));
      spriteData.css.pipe(gulp.dest(dirs.atlases));

      return spriteData;
    };
  }

  gulp.task('atlas:sprites',  atlas('sprites'));
  gulp.task('atlas:graphics', atlas('graphics'));

};
