class ObjectsParser {

  constructor (game, mapObjects) {
    this.game = game;

    this.objects = this._parse(mapObjects);
  }

  // --------------------------------------------------------------------------

  _parse (mapObjects) {
    var objects = {
      traps: [],
      positions: {},
      platforms: [],
      miscellaneousObjects: []
    };

    for (var object of mapObjects) {
      switch (object.type) {
        case 'trap':
          objects['traps'].push(this._makeTrap(object));
          break;

        case 'position':
          objects['positions'][object.name] = this._makeObjectPosition(object);
          break;

        case 'platform':
          objects['platforms'].push(this._makePlatform(object));
          break;
      }
    }

    return objects;
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

  _makeObjectPosition ({ x, y, name }) {
    switch(name) {
      case 'heart':
      case 'star':
        return {
          position: this._normalizeActorCoordinates(x, y)
        };
      case 'goal':
        return {
          position: this._normalizeGoalCoordinates(x, y)
        };
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

}


export default ObjectsParser;
