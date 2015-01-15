class Platform extends Phaser.Sprite {

  constructor (game, type, availableTo) {
    super(game, 0, 0, this._getType(type), this._getColor(availableTo));

    this._setupPhysicsBody(this.width - 4, 8, 2);
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

  _getType (type) {
    switch (type) {
      case 'short' : return 'platform-fixed-1';
      case 'medium': return 'platform-fixed-2';
    }
  }

  _getColor (role) {
    switch (role) {
      case 'heart': return 0;
      case 'star' : return 1;
      default     : return 2;
    }
  }

}


export default Platform;
