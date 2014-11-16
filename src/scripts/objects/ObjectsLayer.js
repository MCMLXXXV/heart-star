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
      Trap, this.preferedTrapColor);
  }

  addPlatform (x, y, type) {
    this._addObject(
      x, y, this._platformsGroup,
      Platform, this._getPlatformType(type),
      this.preferedPlatformColor);
  }

  addRetractable ({ retractable, button }) {
    var retractable, button;

    {
      var { position: { x, y } } = retractable;

      retractable = this._addObject(
        x, y, this._retractableGroup,
        Retractable, this.preferedRetractableColor);
    }

    {
      var { position: { x, y }, orientation } = button;

      button = this._addObject(
        x, y, this._buttonGroup,
        Button, orientation, this.preferedButtonColor);
    }

    retractable.bindTo(button);
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

  _getPlatformType (type) {
    switch (type) {
      case 'small':  return Platform.SMALL;
      case 'medium': return Platform.MEDIUM;
    }
  }

  _buttonCollisionCallback (actor, button) {
    button.trigger();
  }

  _buttonCollisionProcess (actor, button) {
    return !(button.triggered || actor.hurt);
  }

  _retractableCollisionProcess (actor, retractable) {
    return !(retractable.open || actor.hurt);
  }

  _trapCollisionCallback (actor) {
    actor.harm();
  }

  _collisionProcess (actor) {
    return !actor.hurt;
  }

  // --------------------------------------------------------------------------

  get preferedBackground () {
    switch (this._roleName) {
      case 'heart': return BackgroundPattern.HEART;
      case 'star':  return BackgroundPattern.STAR;
      case 'both':  return BackgroundPattern.BOTH;
    }
  }

  get preferedTrapColor () {
    switch (this._roleName) {
      case 'heart': return Trap.HEART;
      case 'star':  return Trap.STAR;
      case 'both':  return Trap.MOON;
    }
  }

  get preferedPlatformColor () {
    switch (this._roleName) {
      case 'heart': return Platform.HEART;
      case 'star':  return Platform.STAR;
      case 'both':  return Platform.BOTH;
    }
  }

  get preferedButtonColor () {
    switch (this._roleName) {
      case 'heart': return Button.HEART;
      case 'star':  return Button.STAR;
      case 'both':  return Button.BOTH;
    }
  }

  get preferedRetractableColor () {
    switch (this._roleName) {
      case 'heart': return Retractable.HEART;
      case 'star':  return Retractable.STAR;
      case 'both':  return Retractable.BOTH;
    }
  }

}


import Trap              from 'objects/Trap';
import Button            from 'objects/Button';
import Platform          from 'objects/Platform';
import Retractable       from 'objects/Retractable';
import BackgroundPattern from 'objects/BackgroundPattern';

export default ObjectsLayer;
