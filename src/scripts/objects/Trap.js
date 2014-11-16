class Trap extends Phaser.Sprite {

  constructor (game, availableTo = Trap.BOTH) {
    super(game, 0, 0, 'trap', availableTo);

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
