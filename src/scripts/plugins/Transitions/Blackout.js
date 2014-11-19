class Blackout extends Phaser.Image {

  constructor (game, width, height) {
    this._bitmap = game.make.bitmapData(width, height);
    this._bitmap.fill(255, 255, 255);

    super(game, 0, 0, this._bitmap);

    this.clear();
  }

  // --------------------------------------------------------------------------

  clear () {
    this.alpha = 0;
  }

}


export default Blackout;
