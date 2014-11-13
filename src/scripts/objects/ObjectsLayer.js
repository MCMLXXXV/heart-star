class ObjectsLayer extends Phaser.Group {

  constructor (game, roleName) {
    super(game);

    this._roleName = roleName;

    this._tilemap      = null;
    this._tilemapLayer = null;

    this._backgroundGroup = this.add(this._makeGroup());
    this._tilemapGroup    = this.add(this._makeGroup());
    this._trapsGroup      = this.add(this._makeGroup());
    this._platformsGroup  = this.add(this._makeGroup());
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
    this._getOrCreateObject(group, factory, ... features).reset(x, y);
  }

  _getOrCreateObject (group, factory, ... features) {
    var object = group.getFirstDead();

    if (object === null)
      object = group.add(new factory(this.game, 0, 0, ... features));

    return object;
  }

  _getPlatformType (type) {
    switch (type) {
      case 'small':  return Platform.SMALL;
      case 'medium': return Platform.MEDIUM;
    }
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

}


import Trap              from 'objects/Trap';
import Platform          from 'objects/Platform';
import BackgroundPattern from 'objects/BackgroundPattern';

export default ObjectsLayer;
