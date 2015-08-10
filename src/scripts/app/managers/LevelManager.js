import levels from '../data/levels';


const shiftCoordinates = (x, y, ox, oy) => ({ x: x + ox, y: y + oy });


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
          objects['traps'].push(this._makeTrap(object));
          break;

        case 'layers':
          objects['layers'] = this._makeTilemapLayerNames(object);
          break;

        case 'platform':
          objects['platforms'].push(this._makePlatform(object));
          break;

        case 'button':
          this._getOrMakeRetractableObject(
            objects['retractables'], object.properties.triggers)
              .button = this._makeButton(object);
          break;

        case 'retractable':
          this._getOrMakeRetractableObject(
            objects['retractables'], object.name)
              .retractable = this._makeRetractable(object);
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

  _makeTilemapLayerNames ({ properties: { heart, star } }) {
    return { heart, star };
  }

  _makeTrap ({ x, y, properties: { affects, orientation } }) {
    return {
      position: shiftCoordinates(x, y, 0, -8),
      affects, orientation
    };
  }

  _makePlatform ({ x, y, properties: { affects, type } }) {
    return { position: { x, y }, affects, type };
  }

  _makeButton ({ x, y, properties: { orientation } }) {
    return {
      position: shiftCoordinates(x, y, 8, 8),
      orientation
    };
  }

  _makeRetractable ({ x, y, name, properties: { affects, orientation } }) {
    return {
      position: shiftCoordinates(x, y, 8, 0),
      affects, orientation
    };
  }

  _getOrMakeRetractableObject (object, name) {
    object[name] = object[name] || {};

    return object[name];
  }

}


export default LevelManager;
