class Iris extends Phaser.Image {

  constructor (game, width, height) {
    this._bitmap = game.make.bitmapData(width, height);

    super(game, 0, 0, this._bitmap);

    this.clear();
  }

  // --------------------------------------------------------------------------

  clear () {
    this.aperture = 1;
  }

  // --------------------------------------------------------------------------

  _drawAperture (aperture) {
    var bitmap = this._bitmap;
    var { width, height } = bitmap;
    var radius = aperture * Phaser.Math.distance(width, height, 0, 0) / 2;

    bitmap.blendSourceOver();
    bitmap.fill(0, 0, 0);
    bitmap.blendDestinationOut();
    bitmap.circle(width / 2, height / 2, radius, 'white');
  }

  // --------------------------------------------------------------------------

  get aperture () {
    return this._aperture;
  }

  set aperture (newValue) {
    this._drawAperture(newValue);
    this._aperture = newValue;
  }

}


export default Iris;
