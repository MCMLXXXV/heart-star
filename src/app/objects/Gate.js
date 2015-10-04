class Gate extends Phaser.Sprite {

  constructor (game, role) {
    super(game, 0, 0, 'sprites');

    this.anchor.set(0.5, 0);

    this._setupPhysicsBody(16, 56);
    this._setupAnimations(role);
  }

  // --------------------------------------------------------------------------

  reset (x, y) {
    super.reset(x, y);

    this.close();

    return this;
  }

  bindTo (button) {
    button.wasTriggered.add(this._open, this);
  }

  close () {
    this.animations.play('close');
    this.open = false;
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
    const frames = (i, j = i) =>
      Phaser.Animation.generateFrameNames(`gate-${role}-`, i, j, '', 1);

    this.animations.add('close', frames(1),     0, false);
    this.animations.add('open',  frames(1, 5), 10, false)
      .onComplete.add(this._openingComplete, this);
  }

  _open () {
    this.animations.play('open');
  }

  _openingComplete () {
    this.open = true;
  }

}


export default Gate;
