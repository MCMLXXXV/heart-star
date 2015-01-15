// This code was borrowed from the project `gulp-starter`, by Daniel Tello,
// licensed under the MIT License.
//
// Find out more in <https://github.com/greypants/gulp-starter/>

'use strict';


var notify  = require('gulp-notify');
var plumber = require('gulp-plumber');


module.exports = function () {
  return plumber(function () {
    // Send error to notification center with gulp-notify
    notify.onError({
      title: 'Compile Error',
      message: '<' + '%= error %' + '>'
    }).apply(this, arguments);

    // Keep gulp from hanging on this task
    this.emit('end');
  });
};
