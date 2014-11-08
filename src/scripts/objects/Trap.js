class Trap extends Phaser.Sprite {

  constructor (game, x, y, availableTo = Trap.BOTH) {
    super(game, x, y, 'trap', availableTo);

    this._setupPhysicsBody(this.width - 2, 8, 1, 8);
  }

  // --------------------------------------------------------------------------

  _setupPhysicsBody (width, height, offsetX = 0, offsetY = 0) {
    if (this.body === null) {
      this.game.physics.arcade.enableBody(this);
    }

    this.body.immovable = true;

    this.body.setSize(width, height, offsetX, offsetY);
  }

}


Trap.HEART = 0;
Trap.STAR  = 1;
Trap.BOTH  = 2;

export default Trap;
