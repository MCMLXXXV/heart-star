const type = (t) => ({ type }) => type === t;

const find = (t, o) => o.find(type(t));
const filter = (t, o) => o.filter(type(t));
const keys = (o) => Object.keys(o);
const reduce = (f, m, a) => a.reduce(f, m);
const mapObj = (f, o) => reduce((m, k) => (m[k] = f(o[k]), m), {}, keys(o));

const shift = (ox, oy) => (x, y) => ({ x: x + ox, y: y + oy });

const parseMeta =
  ({ properties: { heart, star, next = null, tutorial = null } }) => ({
    layers: { heart, star }, next, tutorial
  });

const parseObject = (f = shift(0, 0)) => ({ x, y, properties }) => ({
  position: f(x, y), properties
});

const parseActor = parseObject(shift(8, 24));


/**
 * Parse objects contained in the object layer to build a game level.
 *
 * @private
 *
 * @arg {Object[]} objects - A tilemap object layer data structure.
 *
 * @return {Object} Information about sprites placement, etc.
 */
function makeLevel (objects) {
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


/**
 * Build all levels definitions, including data about the placement of the
 * sprites for any given level and some information related to the game
 * progression.
 *
 * This function uses the Phaser `TilemapParser` class internally to read the
 * definitions of all object layers from a named Tilemap, edited with Tiled,
 * and loaded in the current running instance of a Phaser game, and transform
 * those into readable objects to be interpreted and used by the game to place
 * the sprites in their defined positions.
 *
 * @arg {Phaser.Game} g        A running Phaser Game instance.
 * @arg {String}      tilemap  The desired tilemap to be parsed.
 *
 * @return {Object} A raw object, holding all levels definitions.
 */
export default function parseLevelsFromTilemap (g, tilemap) {
  const { objects, properties } = Phaser.TilemapParser.parse(g, tilemap);

  return {
    definitions: mapObj(makeLevel, objects),
    startingLevel: properties['starting-level'],

    getLevel (name) {
      return this.definitions[name] || null;
    }
  };
}
