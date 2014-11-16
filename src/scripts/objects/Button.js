class Button extends Phaser.Sprite {

  constructor (game, x, y, orientation = Button.SOUTH, availableTo = Button.BOTH) {
    super(game, x, y, availableTo);

    this.wasTriggered = new Phaser.Signal();

    this._setupPhysicsBody(16, 8);
    this.orientation = orientation;

    this.triggered = false;
  }

  // --------------------------------------------------------------------------

  reset (x, y) {
    super.reset(x, y);

    this.frame     = 0;
    this.triggered = false;

    return this;
  }

  trigger () {
    this.frame     = 1;
    this.triggered = true;

    this.wasTriggered.dispatch();
  }

  // --------------------------------------------------------------------------

  _setupPhysicsBody (width, height, offsetX = 0, offsetY = 0) {
    if (this.body === null) {
      this.game.physics.arcade.enableBody(this);
    }

    this.body.immovable = true;
    this.body.setSize(width, height, offsetX, offsetY);
  }

  _setOrientation (orientation) {
    if (this._orientation === orientation) return;

    if (orientation === Button.NORTH) {
      this.anchor.set(0.5, 1);
      this._setupPhysicsBody(16, 8);
      this.angle = 0;
    }
    else if (orientation === Button.SOUTH) {
      this.anchor.set(0.5, 0);
      this._setupPhysicsBody(16, 8, 0, -16);
      this.angle = 180;
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

Button.HEART = 'button-game-heart';
Button.STAR  = 'button-game-star';
Button.BOTH  = 'button-game-moon';

export default Button;
