class Retractable extends Phaser.Sprite {

  constructor (game, availableTo) {
    super(game, 0, 0, this._getColor(availableTo));

    this.anchor.set(0.5, 0);

    this._setupPhysicsBody(16, 48);
    this._setupAnimations();

    this.open = false;
  }

  // --------------------------------------------------------------------------

  reset (x, y) {
    super.reset(x, y);

    this.animations.play('close');
    this.open = false;

    return this;
  }

  bindTo (button) {
    button.wasTriggered.add(this._open, this);
  }

  close () {
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

  _getColor (type) {
    switch (type) {
      case 'heart': return 'retractable-heart';
      case 'star' : return 'retractable-star';
      default     : return 'retractable-both';
    }
  }

  _setupAnimations () {
    this.animations.add('close', [ 0 ],  0, false);
    this.animations.add('open',   null, 10, false)
      .onComplete.add(this._openingComplete, this);
  }

  _open () {
    this.animations.play('open');
  }

  _openingComplete () {
    this.open = true;
  }

}


export default Retractable;
