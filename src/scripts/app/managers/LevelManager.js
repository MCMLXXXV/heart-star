import levels from '../data/levels';


const shiftCoordinates = (x, y, ox, oy) => ({ x: x + ox, y: y + oy });

function getLayers ({ heart, star }) {
  return { heart, star };
}

function getTrap (x, y, { affects, orientation }) {
  return { position: shiftCoordinates(x, y, 0, -8), affects, orientation };
}

function getPlatform (x, y, { affects, type }) {
  return { position: { x, y }, affects, type };
}

function getButton (x, y, { orientation }) {
  return { position: shiftCoordinates(x, y, 8, 8), orientation };
}

function getRetractable (x, y, { affects, orientation }) {
  return { position: shiftCoordinates(x, y, 8, 0), affects, orientation };
}

function getOrMakeRetractableObject (object, name) {
  return object[name] = object[name] || {};
}


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
        definitions[name] = this._makeLevel(level, objects);
        return definitions;
      }, {});
  }

  _makeLevel ({ next }, layerObjects) {
    return {
      goal: this._parseGoal(layerObjects),
      actors: this._parseActors(layerObjects),
      objects: this._parseLayerObjects(layerObjects),
      tutorial: this._parseTutorialLabel(layerObjects),
      next
    };
  }

  _parseGoal (objects) {
    return objects.find(({ type }) => type === 'goal');
  }

  _parseActors (objects) {
    const pos = ({ x, y }) => shiftCoordinates(x, y, 8, 24);
    return objects
      .filter(({ type }) => type === 'actor')
      .reduce((memo, o) => (memo[o.name] = pos(o), memo), {});
  }

  _parseTutorialLabel (objects) {
    const { name } = objects.find(({ type }) => type === 'tutorial') || {};
    return name || null;
  }

  _parseLayerObjects (objects) {
    return objects.reduce((objects, { x, y, name, type, properties }) => {
      switch (type) {
        case 'trap':
          objects['traps'].push(getTrap(x, y, properties));
          break;

        case 'layers':
          objects['layers'] = getLayers(properties);
          break;

        case 'platform':
          objects['platforms'].push(getPlatform(x, y, properties));
          break;

        case 'button':
          getOrMakeRetractableObject(
            objects['retractables'], properties.triggers)
              .button = getButton(x, y, properties);
          break;

        case 'retractable':
          getOrMakeRetractableObject(objects['retractables'], name)
            .retractable = getRetractable(x, y, properties);
          break;
      }

      return objects;
    }, {
      traps: [],
      layers: null,
      platforms: [],
      retractables: {}
    });
  }

}


export default LevelManager;
