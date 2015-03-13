import labels  from './atlases/labels';
import buttons from './atlases/buttons';


export default {

  // - Game Boot Assets -------------------------------------------------------

  'bootAssets': [

    {
      'type': 'image',
      'key': 'preloader-background',
      'url': 'images/preloader-background.png'
    }

  ],

  // - Graphics section -------------------------------------------------------
  //
  // TODO: Most of the graphical assets defined individually below must be
  //       repackaged as a graphics atlas to simplify loading process, GPU
  //       memory consumption etc.

  'graphics': [

    {
      'type': 'image',
      'key': 'background-credits-ai',
      'url': 'images/background-credits-ai.png',
    },

    {
      'type': 'image',
      'key': 'background-credits-rb',
      'url': 'images/background-credits-rb.png',
    },

    {
      'type': 'image',
      'key': 'background-level-select',
      'url': 'images/background-level-select.png',
    },

    {
      'type': 'image',
      'key': 'background-title',
      'url': 'images/background-title.png',
    },

    {
      'type': 'image',
      'key': 'bg-pattern-heart',
      'url': 'images/bg-pattern-heart.png',
    },

    {
      'type': 'image',
      'key': 'bg-pattern-heart-star',
      'url': 'images/bg-pattern-heart-star.png',
    },

    {
      'type': 'image',
      'key': 'bg-pattern-moon',
      'url': 'images/bg-pattern-moon.png',
    },

    {
      'type': 'image',
      'key': 'bg-pattern-star',
      'url': 'images/bg-pattern-star.png',
    },

    {
      'type': 'spritesheet',
      'key': 'button-game-heart',
      'url': 'images/button-game-heart.png',
      'frameWidth': 16,
      'frameHeight': 16,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'spritesheet',
      'key': 'button-game-moon',
      'url': 'images/button-game-moon.png',
      'frameWidth': 16,
      'frameHeight': 16,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'spritesheet',
      'key': 'button-game-star',
      'url': 'images/button-game-star.png',
      'frameWidth': 16,
      'frameHeight': 16,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'atlasJSONHash',
      'key': 'buttons',
      'textureURL': 'images/buttons.png',
      'atlasData': buttons
    },

    {
      'type': 'spritesheet',
      'key': 'character-heart',
      'url': 'images/character-heart.png',
      'frameWidth': 24,
      'frameHeight': 24,
      'margin': 4,
      'spacing': 8,
      'frameMax': 31
    },

    {
      'type': 'spritesheet',
      'key': 'character-star',
      'url': 'images/character-star.png',
      'frameWidth': 24,
      'frameHeight': 24,
      'margin': 4,
      'spacing': 8,
      'frameMax': 31
    },

    {
      'type': 'atlasJSONHash',
      'key': 'labels',
      'textureURL': 'images/labels.png',
      'atlasData': labels
    },

    {
      'type': 'spritesheet',
      'key': 'platform-fixed-1',
      'url': 'images/platform-fixed-1.png',
      'frameWidth': 16,
      'frameHeight': 16,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'spritesheet',
      'key': 'platform-fixed-2',
      'url': 'images/platform-fixed-2.png',
      'frameWidth': 32,
      'frameHeight': 16,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'spritesheet',
      'key': 'platform-goal',
      'url': 'images/platform-goal.png',
      'frameWidth': 32,
      'frameHeight': 32,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'image',
      'key': 'preloader-background',
      'url': 'images/preloader-background.png',
    },

    {
      'type': 'spritesheet',
      'key': 'retractable-both',
      'url': 'images/retractable-both.png',
      'frameWidth': 16,
      'frameHeight': 48,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'spritesheet',
      'key': 'retractable-heart',
      'url': 'images/retractable-heart.png',
      'frameWidth': 16,
      'frameHeight': 48,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'spritesheet',
      'key': 'retractable-star',
      'url': 'images/retractable-star.png',
      'frameWidth': 16,
      'frameHeight': 48,
      'margin': 8,
      'spacing': 8
    },

    {
      'type': 'image',
      'key': 'tileset',
      'url': 'images/tileset.png',
    },

    {
      'type': 'tilemap',
      'key': 'tilemaps',
      'url': 'tilemaps/tilemaps.json',
      'format': 'TILED_JSON'
    },

    {
      'type': 'spritesheet',
      'key': 'trap',
      'url': 'images/trap.png',
      'frameWidth': 16,
      'frameHeight': 16,
      'margin': 8,
      'spacing': 8
    }

  ],

  // - Sound effects section --------------------------------------------------

  'sfx': [

    // TODO: No sound effects yet!

    // {
    //   'type': 'audio',
    //   'key': 'none',
    //   'urls': [ 'audio/none.m4a', 'audio/none.ogg' ],
    //   'autoDecode': true
    // }

  ]

};
