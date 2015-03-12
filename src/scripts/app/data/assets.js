import buttons from './buttons';


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
      'type': 'image',
      'key': 'label-carrying-partners',
      'url': 'images/label-carrying-partners.png',
    },

    {
      'type': 'image',
      'key': 'label-credits-ai',
      'url': 'images/label-credits-ai.png',
    },

    {
      'type': 'image',
      'key': 'label-credits-rb',
      'url': 'images/label-credits-rb.png',
    },

    {
      'type': 'image',
      'key': 'label-game-primer',
      'url': 'images/label-game-primer.png',
    },

    {
      'type': 'image',
      'key': 'label-hero-blocks',
      'url': 'images/label-hero-blocks.png',
    },

    {
      'type': 'image',
      'key': 'label-level-select',
      'url': 'images/label-level-select.png',
    },

    {
      'type': 'image',
      'key': 'label-title',
      'url': 'images/label-title.png',
    },

    {
      'type': 'image',
      'key': 'label-version',
      'url': 'images/label-version.png',
    },

    {
      'type': 'image',
      'key': 'logo-adventure-islands',
      'url': 'images/logo-adventure-islands.png',
    },

    {
      'type': 'image',
      'key': 'logo-rb',
      'url': 'images/logo-rb.png',
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
