const find   = (f, o) => o.find(f);
const filter = (f, o) => o.filter(f);
const keys   = (o) => Object.keys(o);
const reduce = (f, m, a) => a.reduce(f, m);
const mapObj = (f, o) => reduce((m, k) => (m[k] = f(o[k]), m), {}, keys(o));
const all    = (...fs) => (...a) => fs.every((f) => f(...a));
const exists = (o) => (o != null);
const maybe  = (f) => (o) => exists(o) && f(o) || null;

const shift = (ox, oy) => (x, y) => ({ x: x + ox, y: y + oy });

const type         = (s) => ({ type }) => type === s;
const owner        = (s) => ({ properties: { owner }}) => owner === s;
const typeAndOwner = (s) => (k) => all(type(s), owner(k));

const selectGate     = typeAndOwner('gate');
const selectButton   = typeAndOwner('button');
const selectSpike    = typeAndOwner('trap');
const selectPlatform = typeAndOwner('platform');

const parseMeta =
  ({ properties: { heart, star, next = null, tutorial = null } }) => ({
    layers: { heart, star }, next, tutorial
  });

const parseObject = (f = shift(0, 0)) => ({ x, y, properties }) => ({
  position: f(x, y), properties
});

const parseActor = parseObject(shift(8, 24));

const parseGate     = ({ x, y }) => ({ x, y });
const parseButton   = ({ x, y, properties: { orientation }}) => ({ x: x + 8, y: y + 8, orientation });
const parseSpike    = ({ x, y, width }) => ({ x, y: y - 8, width });
const parsePlatform = ({ x, y, properties: { type: size }}) => ({ x, y, size });


const proto = {
  /**
   * Get the definitions for a given game level. If given the name of an
   * unknown level, return null.
   *
   * @arg {String} name - The name of a level.
   *
   * @return {Object|null} The level definitions of a existing level,
   * null otherwise.
   */
  getLevel (name) {
    return this.levels[name] || null;
  }
};


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
  const objs = (k) => ({
    gate: maybe(parseGate)(find(selectGate(k), objects)),
    button: maybe(parseButton)(find(selectButton(k), objects)),
    spikes: filter(selectSpike(k), objects).map(maybe(parseSpike)),
    platforms: filter(selectPlatform(k), objects).map(maybe(parsePlatform))
  });

  return {
    meta: parseMeta(find(({ type }) => type === 'meta', objects)),
    heart: parseActor(find(({ type }) => type === 'heart', objects)),
    star: parseActor(find(({ type }) => type === 'star', objects)),
    goal: parseObject()(find(({ type }) => type === 'goal', objects)),
    objects: {
      both: objs('both'),
      heart: objs('heart'),
      star: objs('star')
    }
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
  return Object.assign(Object.create(proto), {
    levels: mapObj(makeLevel, objects),
    startingLevel: properties['starting-level']
  });
}
