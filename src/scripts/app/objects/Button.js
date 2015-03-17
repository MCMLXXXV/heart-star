class Button extends Phaser.Sprite {

  constructor (game, role, orientation = Button.SOUTH) {
    super(game, 0, 0, 'objects');

    this.wasTriggered = new Phaser.Signal();

    this.anchor.set(0.5);

    this.orientation = orientation;

    this._setupAnimations(role);
  }

  // --------------------------------------------------------------------------

  reset (x, y) {
    super.reset(x, y);

    this.switchOff();

    return this;
  }

  switchOn () {
    this.animations.play('on');
    this.triggered = true;

    this.wasTriggered.dispatch();
  }

  switchOff () {
    this.animations.play('off');
    this.triggered = false;
  }

  // --------------------------------------------------------------------------

  _setupPhysicsBody (width, height, offsetX = 0, offsetY = 0) {
    if (this.body === null) {
      this.game.physics.arcade.enableBody(this);
    }

    this.body.immovable = true;
    this.body.setSize(width, height, offsetX, offsetY);
  }

  _setupAnimations (role) {
    const frames = (i) =>
      Phaser.Animation.generateFrameNames(`${role}-button-`, i, i, '', 1);

    this.animations.add('on',  frames(2), 0, false);
    this.animations.add('off', frames(1), 0, false);
  }

  _setOrientation (orientation) {
    if (this._orientation === orientation) return;

    switch (orientation) {
      case Button.NORTH:
        this._setupPhysicsBody(16, 8, 0,  4);
        this.angle = 0;
        break;

      case Button.SOUTH:
        this._setupPhysicsBody(16, 8, 0, -4);
        this.angle = 180;
        break;
    }

    this._orientation = orientation;
  }

  // --------------------------------------------------------------------------

  get orientation () {
    return this._orientation;
  }

  set orientation (newValue) {
    this._setOrientation(newValue);
  }

}


Button.NORTH = 'north';
Button.SOUTH = 'south';

export default Button;
