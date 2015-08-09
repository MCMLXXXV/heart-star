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

  _parseGoal (layerObjects) {
    const filter = ({ type }) => type === 'goal';
    return this._makeGoalPosition(layerObjects.find(filter));
  }

  _parseActors (layerObjects) {
    return layerObjects
      .filter(({ type }) => type === 'actor')
      .reduce((memo, o) => {
        memo[o.name] = this._makeActorPosition(o);
        return memo;
      }, {});
  }

  _parseTutorialLabel (layerObjects) {
    for (var { type, name } of layerObjects) {
      if (type === 'tutorial') {
        return name;
      }
    }

    return null;
  }

  _parseLayerObjects (layerObjects) {
    var objects = {
      traps: [],
      layers: null,
      platforms: [],
      retractables: {}
    };

    for (var object of layerObjects) {
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
    }

    return objects;
  }

  _makeTilemapLayerNames ({ properties: { heart, star } }) {
    return { heart, star };
  }

  _makeActorPosition ({ x, y }) {
    return this._normalizeCoordinates(x, y, 8, 24);
  }

  _makeGoalPosition ({ x, y }) {
    return this._normalizeCoordinates(x, y, 16, 16);
  }

  _makeTrap ({ x, y, properties: { affects, orientation } }) {
    return {
      position: this._normalizeCoordinates(x, y, 0, -8),
      affects, orientation
    };
  }

  _makePlatform ({ x, y, properties: { affects, type } }) {
    return { position: { x, y }, affects, type };
  }

  _makeButton ({ x, y, properties: { orientation } }) {
    return {
      position: this._normalizeCoordinates(x, y, 8, 8),
      orientation
    };
  }

  _makeRetractable ({ x, y, name, properties: { affects, orientation } }) {
    return {
      position: this._normalizeCoordinates(x, y, 8, 0),
      affects, orientation
    };
  }

  _getOrMakeRetractableObject (object, name) {
    object[name] = object[name] || {};

    return object[name];
  }

  _normalizeCoordinates (x, y, offsetX, offsetY) {
    return { x: x + offsetX, y: y + offsetY };
  }

}


export default LevelManager;
