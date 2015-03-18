import labels     from './atlases/labels';
import buttons    from './atlases/buttons';
import objects    from './atlases/objects';
import background from './atlases/background';
import characters from './atlases/characters';


export default {

  // - Game Boot Assets -------------------------------------------------------

  'boot': [

    {
      'type': 'image',
      'key': 'splash-screen',
      'url': 'images/splash-screen.png'
    }

  ],

  // - Graphics section -------------------------------------------------------

  'graphics': [

    {
      'type': 'atlasJSONHash',
      'key': 'background',
      'textureURL': 'images/background.png',
      'atlasData': background
    },

    {
      'type': 'atlasJSONHash',
      'key': 'buttons',
      'textureURL': 'images/buttons.png',
      'atlasData': buttons
    },

    {
      'type': 'atlasJSONHash',
      'key': 'characters',
      'textureURL': 'images/characters.png',
      'atlasData': characters
    },

    {
      'type': 'atlasJSONHash',
      'key': 'labels',
      'textureURL': 'images/labels.png',
      'atlasData': labels
    },

    {
      'type': 'atlasJSONHash',
      'key': 'objects',
      'textureURL': 'images/objects.png',
      'atlasData': objects
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
