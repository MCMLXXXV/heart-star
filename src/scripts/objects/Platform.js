class Platform extends Phaser.Sprite {

  constructor (game, type = Platform.SMALL, availableTo = Platform.BOTH) {
    super(game, 0, 0, type, availableTo);

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

}


Platform.SMALL  = 'platform-fixed-1';
Platform.MEDIUM = 'platform-fixed-2';

Platform.HEART = 0;
Platform.STAR  = 1;
Platform.BOTH  = 2;

export default Platform;
