class Goal extends Phaser.Sprite {

  constructor (game) {
    super(game, 0, 0, 'platform-goal');

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

    if (playerCollided && idleCollided && this.actorsStanding) {
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

  // --------------------------------------------------------------------------

  get actorsStanding () {
    var { left, right, up, down } = this.body.touching;

    return up && !(left || right || down);
  }

}


export default Goal;
