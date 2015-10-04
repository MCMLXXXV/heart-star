import sprites  from './atlases/sprites';
import graphics from './atlases/graphics';


export default {

  // - Game Boot Assets -------------------------------------------------------
  boot: [
    {
      type: 'image',
      key: 'splash-screen'
    }
  ],

  // - Graphics section -------------------------------------------------------
  graphics: [
    {
      type: 'atlasJSONHash',
      key: 'graphics',
      atlasData: graphics
    },
    {
      type: 'atlasJSONHash',
      key: 'sprites',
      atlasData: sprites
    },
    {
      type: 'image',
      key: 'tileset'
    },
    {
      type: 'tilemap',
      key: 'tilemaps',
      format: 'TILED_JSON'
    }
  ]
};
