import ObjectsLayer from '../objects/ObjectsLayer';


class ObjectsManager {

  constructor (game) {
    this.game = game;

    this._layers = {};
  }

  // --------------------------------------------------------------------------

  createLayerFor (owner, enableBackground = false) {
    var layer = new ObjectsLayer(this.game, owner);

    if (enableBackground)
      layer.enableBackground();

    this._layers[owner] = layer;

    return layer;
  }

  createObjects (mapObjects) {
    this._recycle();
    this._makeTilemapLayers(mapObjects.meta.layers);
    this._makeTraps(mapObjects.traps);
    this._makePlatforms(mapObjects.platforms);
    // this._makeRetractables(mapObjects.retractables);
  }

  reset () {
    for (var key of Object.keys(this._layers))
      this._resetLayer(this._layers[key]);
  }

  // --------------------------------------------------------------------------

  _recycle () {
    Object.keys(this._layers)
      .forEach((key) => this._layers[key].recycle());
  }

  _makeTilemapLayers (layers) {
    for (var layer in layers)
      this._makeTilemapLayer(layer, layers[layer]);
  }

  _makeTilemapLayer (actor, layerName) {
    this._getRecipientGroupFor(actor).addTilemapLayer(layerName);
  }

  _makeTraps (traps) {
    for (var { position, properties: { owner } } of traps)
      this._getRecipientGroupFor(owner).addTrap(
        position.x, position.y);
  }

  _makePlatforms (platforms) {
    for (var { position, properties: { owner, type } } of platforms)
      this._getRecipientGroupFor(owner).addPlatform(
        position.x, position.y, type);
  }

  // _makeRetractables (retractables) {
  //   for (var key of Object.keys(retractables))
  //     this._makeRetractable(retractables[key]);
  // }

  // _makeRetractable ({ retractable, button }) {
  //   this._getRecipientGroupFor(retractable.affects).addRetractable(
  //     { retractable, button });
  // }

  _getRecipientGroupFor (owner) {
    return this._layers[owner];
  }

  _resetLayer (objectsLayer) {
    objectsLayer.reset();
  }

}


export default ObjectsManager;
