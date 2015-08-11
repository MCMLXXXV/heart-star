import levels from '../data/levels';


class LevelManager {

  constructor (game) {
    this.game = game;

    this.definitions = this._createLevelDefinitions();
  }

  // --------------------------------------------------------------------------

  getLevel (name) {
    return this.definitions[name] || null;
  }

  // --------------------------------------------------------------------------

  _createLevelDefinitions () {
    const getTilemapDefinitions = (tilemap) =>
      Phaser.TilemapParser.parse(this.game, tilemap);
    const { objects } = getTilemapDefinitions('tilemaps');

    return levels
      .map((level) => [ level, level.name, objects[level.name] ])
      .reduce((definitions, [ level, name, objects ]) => {
        definitions[name] = this._makeLevel(objects);
        return definitions;
      }, Object.create(null));
  }

  _makeLevel (objects) {
    const type  = (t) => ({ type }) => type === t;
    const find = (t, o) => o.find(type(t));
    const filter = (t, o) => o.filter(type(t));

    const shift = (ox, oy) => (x, y) => ({ x: x + ox, y: y + oy });

    const parseMeta =
      ({ properties: { heart, star, next = null, tutorial = null } }) => ({
        layers: { heart, star }, next, tutorial
      });

    const parseObject = (f = shift(0, 0)) => ({ x, y, properties }) => ({
      position: f(x, y), properties
    });

    const parseActor = parseObject(shift(8, 24));

    return {
      meta: parseMeta(find('meta', objects)),
      heart: parseActor(find('heart', objects)),
      star: parseActor(find('star', objects)),
      goal: parseObject()(find('goal', objects)),
      traps: filter('trap', objects).map(parseObject(shift(0, -8))),
      platforms: filter('platform', objects).map(parseObject()),
      buttons: filter('button', objects).map(parseObject(shift(8, 8))),
      gates: filter('gate', objects).map(parseObject(shift(8, 0)))
    };
  }

}


export default LevelManager;
