import levels from '../data/levels';


const shiftCoordinates = (x, y, ox, oy) => ({ x: x + ox, y: y + oy });

function getLayers ({ properties: { heart, star } }) {
  return { heart, star };
}

function getTrap ({ x, y, properties: { affects, orientation } }) {
  return { position: shiftCoordinates(x, y, 0, -8), affects, orientation };
}

function getPlatform ({ x, y, properties: { affects, type } }) {
  return { position: { x, y }, affects, type };
}

function getButton ({ x, y, properties: { orientation } }) {
  return { position: shiftCoordinates(x, y, 8, 8), orientation };
}

function getRetractable ({ x, y, properties: { affects, orientation } }) {
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
    const pos = ({ x, y }) => shiftCoordinates(x, y, 16, 16);
    return pos(objects.find(({ type }) => type === 'goal'));
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
    return objects.reduce((objects, object) => {
      switch (object.type) {
        case 'trap':
          objects['traps'].push(getTrap(object));
          break;

        case 'layers':
          objects['layers'] = getLayers(object);
          break;

        case 'platform':
          objects['platforms'].push(getPlatform(object));
          break;

        case 'button':
          getOrMakeRetractableObject(
            objects['retractables'], object.properties.triggers)
              .button = getButton(object);
          break;

        case 'retractable':
          getOrMakeRetractableObject(
            objects['retractables'], object.name)
              .retractable = getRetractable(object);
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
