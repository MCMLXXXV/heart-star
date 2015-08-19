import sprites  from './atlases/sprites';
import graphics from './atlases/graphics';


export default {

  // - Game Boot Assets -------------------------------------------------------
  boot: [
    {
      type: 'image',
      key: 'splash-screen',
      url: 'splash-screen.png'
    }
  ],

  // - Graphics section -------------------------------------------------------
  graphics: [
    {
      type: 'atlasJSONHash',
      key: 'graphics',
      textureURL: 'graphics.png',
      atlasData: graphics
    },
    {
      type: 'atlasJSONHash',
      key: 'sprites',
      textureURL: 'sprites.png',
      atlasData: sprites
    },
    {
      type: 'image',
      key: 'tileset',
      url: 'tileset.png',
    },
    {
      type: 'tilemap',
      key: 'tilemaps',
      url: 'tilemaps.json',
      format: 'TILED_JSON'
    }
  ]
};
