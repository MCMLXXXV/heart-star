class Trap extends Phaser.Sprite {

  constructor (game, availableTo) {
    super(game, 0, 0, 'trap', this._getColor(availableTo));

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

  _getColor (role) {
    switch (role) {
      case 'heart': return 0;
      case 'star' : return 1;
      default     : return 2;
    }
  }

}


export default Trap;
