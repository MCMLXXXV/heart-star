import sprites  from './atlases/sprites';
import graphics from './atlases/graphics';


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
      'key': 'graphics',
      'textureURL': 'images/graphics.png',
      'atlasData': graphics
    },

    {
      'type': 'atlasJSONHash',
      'key': 'sprites',
      'textureURL': 'images/sprites.png',
      'atlasData': sprites
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

  ]

};
