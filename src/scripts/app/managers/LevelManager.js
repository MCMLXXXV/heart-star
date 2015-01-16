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
    var objectLayers = this._getTilemapObjectLayers();
    var definitions  = {};

    for (var level of levels) {
      var { name } = level;

      definitions[name] = this._makeLevel(level, objectLayers[name]);
    }

    return definitions;
  }

  _getTilemapObjectLayers () {
    return this._getTilemapDefinitions().objects;
  }

  _getTilemapDefinitions () {
    return Phaser.TilemapParser.parse(this.game, 'tilemaps');
  }

  _makeLevel ({ next }, layerObjects) {
    return {
      'actors' : this._parseLayerActors(layerObjects),
      'objects': this._parseLayerObjects(layerObjects),
      'label'  : this._parseTutorialLabel(layerObjects),
      'next'   : next
    };
  }

  _parseLayerActors (layerObjects) {
    var actors = {};

    for (var object of layerObjects) {
      if (object.type === 'position') {
        actors[object.name] = this._makeActorPosition(object);
      }
    }

    return actors;
  }

  _parseTutorialLabel (layerObjects) {
    for (var { type, name } of layerObjects)
      if (type === 'label')
        return name;

    return null;
  }

  _parseLayerObjects (layerObjects) {
    var objects = {
      'traps'        : [],
      'layers'       : null,
      'platforms'    : [],
      'retractables' : {}
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

  _makeActorPosition ({ x, y, name }) {
    switch (name) {
      case 'heart':
      case 'star':
        return this._normalizeCoordinates(x, y, 8, 24);

      case 'goal':
        return this._normalizeCoordinates(x, y, 16, 16);
    }
  }

  _makeTrap ({ x, y, properties: { affects, orientation } }) {
    return {
      position: this._normalizeCoordinates(x, y, 0, -8),
      affects, orientation
    };
  }

  _makePlatform ({ x, y, properties: { affects, type }}) {
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
