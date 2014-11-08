class ObjectsManager {

  constructor (game) {
    this.game = game;

    this._layers = {};
  }

  // --------------------------------------------------------------------------

  createLayerFor (roleName, enableBackground = false) {
    var layer = new Layer(this.game, roleName);

    if (enableBackground)
      layer.enableBackground();

    this._layers[roleName] = layer;

    return layer;
  }

  createObjects (mapObjects) {
    this._makeTraps(mapObjects.traps);
    this._makePlatforms(mapObjects.platforms);
  }

  // --------------------------------------------------------------------------

  _makeTraps (traps) {
    for (var { position, affects } of traps)
      this._getRecipientGroupFor(affects).addTrap(
        position.x, position.y);
  }

  _makePlatforms (platforms) {
    for (var { position, affects, type } of platforms)
      this._getRecipientGroupFor(affects).addPlatform(
        position.x, position.y, type);
  }

  _getRecipientGroupFor (roleName) {
    return this._layers[roleName];
  }

}


import Layer    from 'objects/Layer';

export default ObjectsManager;
