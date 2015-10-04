/*
 * Directories
 * ============================================================================
 *
 * This module keeps some data about the project directory structure.
 */

'use strict';


module.exports = {
  // Where compiled scripts and assets should be placed.
  dist: 'dist',
  build: 'build',

  // Where this project source code lives.
  scripts: 'src',

  // Where static assets (textures, fonts, sprites, sounds etc.) are stored.
  static: 'static',

  // Paths required by `slush-phaser-plus` sub-generators.
  get states  () { return this.scripts + '/app/states'; },
  get objects () { return this.scripts + '/app/objects'; },
  get plugins () { return this.scripts + '/app/plugins'; },

  // Game assets directory.
  get assets  () { return this.static + '/assets'; },

  // Texture Atlas output directory.
  get atlases () { return this.scripts + '/app/data/atlases'; }
};
