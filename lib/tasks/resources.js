'use strict';


module.exports = function (gulp, $, config) {

  var atlasDir  = config.dirs.atlases;
  var imagesDir = config.dirs.images;

  function atlasify (name) {
    return function () {
      var spriteData = gulp.src('resources/raw-assets/' + name + '/*.png')
        .pipe($.spritesmith({
          imgName: name + '.png',
          cssName: name + '.js',
          cssTemplate: 'resources/texture-atlas.template',
          padding: 2
        }));

      spriteData.img.pipe(gulp.dest(imagesDir));
      spriteData.css.pipe(gulp.dest(atlasDir));

      return spriteData;
    };
  }

  gulp.task('resources:sprites',  atlasify('sprites'));
  gulp.task('resources:graphics', atlasify('graphics'));

};
