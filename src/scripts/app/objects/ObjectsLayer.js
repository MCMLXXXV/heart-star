class ObjectsLayer extends Phaser.Group {

  constructor (game, roleName) {
    super(game);

    this._roleName = roleName;

    this._tilemap      = null;
    this._tilemapLayer = null;

    this._backgroundGroup  = this.add(this._makeGroup());
    this._tilemapGroup     = this.add(this._makeGroup());
    this._retractableGroup = this.add(this._makeGroup());
    this._buttonGroup      = this.add(this._makeGroup());
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

  addPlatform (x, y, type) {
    this._addObject(
      x, y, this._platformsGroup,
      Platform, type, this._roleName);
  }

  addRetractable ({ retractable, button }) {
    var r = this._addRetractable(retractable);
    var b = this._addButton(button);

    r.bindTo(b);
  }

  enableBackground () {
    this._backgroundGroup.add(
      new BackgroundPattern(this.game, this.preferedBackground));
  }

  toggle (visible) {
    this.alpha = visible ? 1 : 0;
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
      this._buttonGroup,
      this._buttonCollisionCallback,
      this._buttonCollisionProcess,
      this);
    this.game.physics.arcade.collide(
      actor,
      this._retractableGroup,
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
    this._retractableGroup.forEach(
      function (retractable) { retractable.close(); });
    this._buttonGroup.forEach(
      function (button) { button.switchOff(); });
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

  _addRetractable ({ position: { x, y } }) {
    return this._addObject(
      x, y, this._retractableGroup,
      Retractable, this._roleName);
  }

  _addButton ({ position: { x, y }, orientation }) {
    return this._addObject(
      x, y, this._buttonGroup,
      Button, this._roleName, orientation);
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


import Trap              from '../objects/Trap';
import Button            from '../objects/Button';
import Platform          from '../objects/Platform';
import Retractable       from '../objects/Retractable';
import BackgroundPattern from '../objects/BackgroundPattern';

export default ObjectsLayer;
