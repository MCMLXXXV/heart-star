class ObjectsLayer extends Phaser.Group {

  constructor (game, roleName) {
    super(game);

    this.actorTrapped = new Phaser.Signal();

    this._roleName = roleName;

    this._background = this.add(this.game.make.group());
    this._traps      = this.add(this.game.make.group());
    this._platforms  = this.add(this.game.make.group());
  }

  // --------------------------------------------------------------------------

  addTrap (x, y) {
    this._addObject(
      x, y, this._traps,
      Trap, this.preferedTrapColor);
  }

  addPlatform (x, y, type) {
    this._addObject(
      x, y, this._platforms,
      Platform, this._getPlatformType(type),
      this.preferedPlatformColor);
  }

  enableBackground () {
    this._background.add(new BackgroundPattern(this.game, this.preferedBackground));
  }

  toggle (visible) {
    this.alpha = visible ? 1 : 0;
  }

  collide (actor) {
    this.game.physics.arcade.collide(
      actor,
      this._traps,
      this._trapCollisionCallback,
      null,
      this);
    this.game.physics.arcade.collide(
      actor,
      this._platforms);
  }

  // --------------------------------------------------------------------------

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
    this.actorTrapped.dispatch(actor);
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
