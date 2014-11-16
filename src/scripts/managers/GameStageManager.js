class GameStageManager {

  constructor (game) {
    this.game = game;

    this.definitions = this._createStageDefinitions();
  }

  // --------------------------------------------------------------------------

  getStage (stageName) {
    return this.definitions[stageName] || null;
  }

  // --------------------------------------------------------------------------

  _createStageDefinitions () {
    var objectLayers = this._getTilemapObjectLayers();
    var definitions  = {};

    for (var stageName of Object.keys(stages))
      definitions[stageName] = this._makeGameStage(
        stages[stageName], objectLayers[stageName]);

    return definitions;
  }

  _getTilemapObjectLayers () {
    return this._getTilemapDefinitions().objects;
  }

  _getTilemapDefinitions () {
    return Phaser.TilemapParser.parse(this.game, 'tilemaps');
  }

  _makeGameStage ({ next }, layerObjects) {
    return {
      'actors' : this._parseLayerActors(layerObjects),
      'objects': this._parseLayerObjects(layerObjects),
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
        return this._normalizeActorCoordinates(x, y);

      case 'goal':
        return this._normalizeGoalCoordinates(x, y);
    }
  }

  _makeTrap ({ x, y, properties: { affects, orientation } }) {
    return {
      position: this._normalizeTrapCoordinates(x, y),
      affects, orientation
    };
  }

  _makePlatform ({ x, y, properties: { affects, type }}) {
    return { position: { x, y }, affects, type };
  }

  _makeButton ({ x, y, properties: { orientation, triggers } }) {
    return {
      position: this._normalizeButtonCoordinates(x, y),
      orientation
    };
  }

  _makeRetractable ({ x, y, name, properties: { affects, orientation } }) {
    return {
      position: this._normalizeRetractableCoordinates(x, y),
      affects, orientation
    };
  }

  _getOrMakeRetractableObject (object, name) {
    object[name] = object[name] || {};

    return object[name];
  }

  _normalizeActorCoordinates (x, y) {
    return { x: x + 8, y: y + 24 };
  }

  _normalizeGoalCoordinates (x, y) {
    return { x: x + 16, y: y + 16 };
  }

  _normalizeTrapCoordinates (x, y) {
    return { x: x, y: y - 8 };
  }

  _normalizeButtonCoordinates (x, y) {
    return { x: x + 8, y: y + 16 };
  }

  _normalizeRetractableCoordinates (x, y) {
    return { x: x + 8, y };
  }

}


import stages from 'common/stages';

export default GameStageManager;
