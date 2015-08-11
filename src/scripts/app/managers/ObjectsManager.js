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

  createObjects (objects) {
    this._recycle();
    this._makeTilemapLayers(objects.meta.layers);
    this._makeTraps(objects.traps);
    this._makePlatforms(objects.platforms);
    this._makeGates(objects.gates);
    this._makeButtons(objects.buttons);
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

  _makeGates (gates) {
    for (const { position: { x, y }, properties: { owner } } of gates) {
      this._getRecipientGroupFor(owner)
        .placeGate(x, y);
    }
  }

  _makeButtons (buttons) {
    for (const { position: { x, y }, properties: { owner, orientation } } of buttons) {
      this._getRecipientGroupFor(owner)
        .placeButton(x, y, orientation);
    }
  }

  _getRecipientGroupFor (owner) {
    return this._layers[owner];
  }

  _resetLayer (objectsLayer) {
    objectsLayer.reset();
  }

}


export default ObjectsManager;
