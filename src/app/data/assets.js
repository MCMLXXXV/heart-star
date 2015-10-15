import sprites  from './atlases/sprites';
import graphics from './atlases/graphics';


export default {

  // - Game Boot Assets -------------------------------------------------------
  boot: [
    {
      type: 'image',
      key: 'splash-screen'
    },
    {
      type: 'image',
      key: 'progress-bar',
      url: 'data:image/gif;base64,' +
       'R0lGODdheAAKAPAAAP+4uAAAACwAAAAAeAAKAAACIYSPqcvtD6OctNqLs968+w+G4kiW' +
       '5omm6sq27gvH8kxzBQA7'
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
