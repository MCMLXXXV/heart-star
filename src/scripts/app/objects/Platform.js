class Platform extends Phaser.Sprite {

  constructor (game, role, range = 'short') {
    super(game, 0, 0, 'objects');

    this._setupAnimations(role);

    this.range = range;
  }

  // --------------------------------------------------------------------------

  _setupPhysicsBody (width, height, offsetX = 0, offsetY = 0) {
    if (this.body === null) {
      this.game.physics.arcade.enableBody(this);
    }

    this.body.immovable = true;

    this.body.checkCollision.left   = false;
    this.body.checkCollision.right  = false;
    this.body.checkCollision.down   = false;

    this.body.setSize(width, height, offsetX, offsetY);
  }

  _setupAnimations (role) {
    for (let range of [ 'short', 'medium' ]) {
      this.animations.add(
        range, [ `${role}-platform-fixed-${range}` ], 0, false);
    }
  }

  // --------------------------------------------------------------------------

  get range () {
    return this._range;
  }

  set range (value) {
    this.animations.play(value);

    if (value === 'short') {
      this._setupPhysicsBody(12, 8, 2);
    }
    else if (value === 'medium') {
      this._setupPhysicsBody(28, 8, 2);
    }

    this._range = value;
  }

}


export default Platform;
