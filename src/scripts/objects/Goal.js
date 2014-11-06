class Goal extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, 'platform-goal');

    this.anchor.set(0.5);

    this._setupPhysicsBody(32, 16, 0, 8);
    this._setupAnimation();

    this.actorsLanded = new Phaser.Signal();
  }

  // --------------------------------------------------------------------------

  collideActors (playerActor, idleActor) {
    var playerCollided = this.game.physics.arcade.collide(
      playerActor, this);
    var idleCollided = this.game.physics.arcade.collide(
      idleActor, this);

    if (playerCollided && idleCollided) {
      this.actorsLanded.dispatch();
    }
  }

  // --------------------------------------------------------------------------

  _setupPhysicsBody (width, height, offsetX, offsetY) {
    if (this.body === null) {
      this.game.physics.arcade.enableBody(this);

    }

    this.body.immovable = true;
    this.body.setSize(width, height, offsetX, offsetY);
  }

  _setupAnimation () {
    this.animations.add('main', null, 8, true).play();
  }

}


export default Goal;
