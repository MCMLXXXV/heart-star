class ObjectsManager {

  constructor (game) {
    this.game = game;

    this.actorTrapped = new Phaser.Signal();

    this._layers = {};
  }

  // --------------------------------------------------------------------------

  createLayerFor (roleName, enableBackground = false) {
    var layer = new ObjectsLayer(this.game, roleName);

    layer.actorTrapped.add(this.actorTrapped.dispatch);

    if (enableBackground)
      layer.enableBackground();

    this._layers[roleName] = layer;

    return layer;
  }

  createObjects (mapObjects) {
    this._makeTilemapLayers(mapObjects.layers);
    this._makeTraps(mapObjects.traps);
    this._makePlatforms(mapObjects.platforms);
  }

  // --------------------------------------------------------------------------

  _makeTilemapLayers (layers) {
    for (var layer in layers)
      this._makeTilemapLayer(layer, layers[layer]);
  }

  _makeTilemapLayer (actor, layerName) {
    this._getRecipientGroupFor(actor).addTilemapLayer(layerName);
  }

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


import ObjectsLayer from 'objects/ObjectsLayer';

export default ObjectsManager;