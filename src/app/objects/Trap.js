class Trap extends Phaser.Sprite {

  constructor (game, role) {
    super(game, 0, 0, 'sprites', `trap-${role}`);

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


export default Trap;
