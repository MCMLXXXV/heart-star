class Trap extends Phaser.Sprite {

  constructor (game, x, y, availableTo = Trap.BOTH) {
    super(game, x, y, 'trap', availableTo);

    this._setupPhysicsBody(this.width - 2, 8, 1, 8);

    this.hitted = new Phaser.Signal();
  }

  // --------------------------------------------------------------------------

  collideCharacter (character) {
    this.game.physics.arcade.collide(
      character,
      this,
      this._characterCollideCallback,
      null,
      this);
  }

  // --------------------------------------------------------------------------

  _setupPhysicsBody (width, height, offsetX = 0, offsetY = 0) {
    if (this.body === null) {
      this.game.physics.arcade.enableBody(this);
    }

    this.body.immovable = true;

    this.body.setSize(width, height, offsetX, offsetY);
  }

  _characterCollideCallback (character) {
    this.hitted.dispatch(character);
  }

}


Trap.HEART = 0;
Trap.STAR  = 1;
Trap.BOTH  = 2;

export default Trap;
