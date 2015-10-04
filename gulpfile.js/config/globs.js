/*
 * Glob patterns
 * ============================================================================
 *
 * Information about the project assets and source code. Very specific to the
 * development tasks, telling where to read the project source code for
 * processing and compilation.
 */

'use strict';


var dirs = require('./dirs');


module.exports = {
  // Finds this project static assets to be copied for distribution.
  get assets () { return dirs.static  + '/**'; },

  // Finds the scripts to be compiled.
  get scripts () { return dirs.scripts + '/**/*.js'; }
};
