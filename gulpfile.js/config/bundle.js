/*
 * Browserify bundle configuration.
 * ============================================================================
 */

'use strict';


var dirs = require('./dirs');

module.exports = {

  debug: true,
  standalone: 'app',
  entries: [ dirs.scripts + '/index.js' ],
  transform: [ 'babelify' ]

};
