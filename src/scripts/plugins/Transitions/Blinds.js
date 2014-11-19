class Blinds extends Phaser.Image {

  constructor (game, width, height) {
    this._bitmap = game.make.bitmapData(width, height);

    super(game, 0, 0, this._bitmap);

    this.clear();
  }

  // --------------------------------------------------------------------------

  clear () {
    this.aperture = 0;
  }

  // --------------------------------------------------------------------------

  _drawAperture (aperture) {
    var bitmap = this._bitmap;
    var { height } = bitmap;

    bitmap.clear();

    for (var i = 0; i < 12; ++i)
      bitmap.rect(24 * i, 0, 24 * aperture, height);

    this._aperture = aperture;
  }

  // --------------------------------------------------------------------------

  get aperture () {
    return this._aperture;
  }

  set aperture (newValue) {
    this._drawAperture(newValue);
  }

}


export default Blinds;
