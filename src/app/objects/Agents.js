class Agents extends Phaser.Group {

  constructor (game) {
    super(game);

    this.enableBody = true;

    this._leftAgent   = this._makeAgent( -20,   0,  16, 160);
    this._rightAgent  = this._makeAgent( 244,   0,  16, 160);
    this._bottomAgent = this._makeAgent(-120, 240, 480,  16);

    this.setAll('body.immovable', true);
  }

  // --------------------------------------------------------------------------

  collide (actor) {
    this.game.physics.arcade.collide(actor, this._leftAgent);
    this.game.physics.arcade.collide(actor, this._rightAgent);

    this.game.physics.arcade.overlap(
      actor,
      this._bottomAgent,
      () => actor.harm(),
      () => !actor.hurt,
      this);
  }

  // --------------------------------------------------------------------------

  _makeAgent (x, y, width, height) {
    const sprite = this.create(x, y, null);
    sprite.body.setSize(width, height);

    return sprite;
  }

}


export default Agents;
