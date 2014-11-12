class Iris extends Phaser.Image {

  constructor (game, width, height) {
    var { centerX, centerY } = game.world;

    this._bitmap = game.make.bitmapData(width, height);

    super(game, centerX, centerY, this._bitmap);

    this.anchor.set(0.5);
    this.aperture = 0;
  }

  // --------------------------------------------------------------------------

  _drawAperture (aperture) {
    var bitmap = this._bitmap;
    var radius = Phaser.Math.max(bitmap.width, bitmap.height) / 2;

    bitmap.blendSourceOver();
    bitmap.fill(0, 0, 0);
    bitmap.blendDestinationOut();
    bitmap.circle(
      bitmap.width / 2, bitmap.height / 2, radius * aperture, 'white');
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
