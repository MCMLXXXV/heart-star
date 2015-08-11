import Gate              from '../objects/Gate';
import Trap              from '../objects/Trap';
import Button            from '../objects/Button';
import Platform          from '../objects/Platform';
import BackgroundPattern from '../objects/BackgroundPattern';


class ObjectsLayer extends Phaser.Group {

  constructor (game, roleName) {
    super(game);

    this._roleName = roleName;

    this._tilemap      = null;
    this._tilemapLayer = null;

    this._tilemapGroup     = this.add(this._makeGroup());

    this._gateGroup = this.add(this._makeGroup());
    this._gate = this._gateGroup.add(new Gate(game, roleName));
    this._button = this._gateGroup.add(new Button(game, roleName));
    this._gate.bindTo(this._button);

    this._trapsGroup       = this.add(this._makeGroup());
    this._platformsGroup   = this.add(this._makeGroup());
  }

  // --------------------------------------------------------------------------

  addTilemapLayer (layerName) {
    if (this._tilemap === null)
      this._tilemap = this._makeTilemap('tilemaps');

    if (this._tilemapLayer !== null)
      this._tilemapLayer.destroy();

    this._tilemapLayer = this._makeTilemapLayer(this._tilemap, layerName);

    this._tilemapGroup.add(this._tilemapLayer);
  }

  addTrap (x, y) {
    this._addObject(
      x, y, this._trapsGroup,
      Trap, this._roleName);
  }

  addPlatform (x, y, range) {
    let platform = this._addObject(
      x, y, this._platformsGroup,
      Platform, this._roleName);

    platform.range = range;
  }

  placeGate (x, y) {
    this._gate.reset(x, y);
  }

  placeButton (x, y, orientation) {
    this._button.reset(x, y);
    this._button.orientation = orientation;
  }

  enableBackground () {
    this.addAt(new BackgroundPattern(this.game, this.preferedBackground), 0);
  }

  collide (actor) {
    this.game.physics.arcade.collide(
      actor,
      this._tilemapLayer,
      null,
      this._collisionProcess,
      this);
    this.game.physics.arcade.collide(
      actor,
      this._button,
      this._buttonCollisionCallback,
      this._buttonCollisionProcess,
      this);
    this.game.physics.arcade.collide(
      actor,
      this._gate,
      null,
      this._retractableCollisionProcess,
      this);
    this.game.physics.arcade.collide(
      actor,
      this._trapsGroup,
      this._trapCollisionCallback,
      this._collisionProcess,
      this);
    this.game.physics.arcade.collide(
      actor,
      this._platformsGroup);
  }

  reset () {
    this._gate.close();
    this._button.switchOff();
  }

  recycle () {
    this._tilemapGroup.callAll('kill');
    this._gateGroup.callAll('kill');
    this._trapsGroup.callAll('kill');
    this._platformsGroup.callAll('kill');
  }

  // --------------------------------------------------------------------------

  _makeTilemap (tilemapKey) {
    var tilemap = this.game.make.tilemap(tilemapKey);

    tilemap.addTilesetImage('tileset');

    return tilemap;
  }

  _makeTilemapLayer (tilemap, layerName) {
    var tilemapLayer = tilemap.createLayer(layerName);

    tilemap.setCollisionBetween(1, 144, true, layerName);

    return tilemapLayer;
  }

  _makeGroup () {
    return this.game.make.group();
  }

  _addObject (x, y, group, factory, ... features) {
    return this._getOrCreateObject(group, factory, ... features).reset(x, y);
  }

  _getOrCreateObject (group, factory, ... features) {
    var object = group.getFirstDead();

    if (object === null)
      object = group.add(new factory(this.game, ... features));

    return object;
  }

  _buttonCollisionCallback (actor, button) {
    button.switchOn();
  }

  _buttonCollisionProcess (actor, button) {
    return !(button.triggered || actor.hurt);
  }

  _retractableCollisionProcess (actor, retractable) {
    return !(retractable.open || actor.hurt);
  }

  _trapCollisionCallback (actor) {
    actor.harm(true);
  }

  _collisionProcess (actor) {
    return !actor.hurt;
  }

  // --------------------------------------------------------------------------

  get preferedBackground () {
    switch (this._roleName) {
      case 'heart': return BackgroundPattern.HEART;
      case 'star':  return BackgroundPattern.STAR;
      case 'both':  return BackgroundPattern.HEART_STAR;
    }
  }

}


export default ObjectsLayer;
