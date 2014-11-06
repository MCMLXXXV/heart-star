class Agents extends Phaser.Group {

  constructor (game) {
    super(game);

    this.characterFellOff = new Phaser.Signal();

    this.enableBody = true;

    this._leftAgent   = this.add(this._makeAgent( -20,   0,  16, 160));
    this._rightAgent  = this.add(this._makeAgent( 244,   0,  16, 160));
    this._bottomAgent = this.add(this._makeAgent(-120, 240, 480,  16));

    this.setAll('body.immovable', true);
  }

  // --------------------------------------------------------------------------

  collide (character) {
    this.game.physics.arcade.collide(this._leftAgent,   character);
    this.game.physics.arcade.collide(this._rightAgent,  character);

    this.game.physics.arcade.overlap(
      this._bottomAgent,
      character,
      this._bottomAgentOverlapCallback,
      null,
      this);
  }

  // --------------------------------------------------------------------------

  _makeBitmap (width, height) {
    return this.game.make.bitmapData(width, height);
  }

  _makeAgent (x, y, width, height) {
    return this.game.make.sprite(x, y, this._makeBitmap(width, height));
  }

  _bottomAgentOverlapCallback (character) {
    this.characterFellOff.dispatch(character);
  }

}


export default Agents;
