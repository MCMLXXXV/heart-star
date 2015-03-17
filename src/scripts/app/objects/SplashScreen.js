class SplashScreen extends Phaser.Group {

  constructor (game) {
    super(game);

    this._barFiller = null;

    this._make();
  }

  // --------------------------------------------------------------------------

  _make () {
    this.add(this._makeBackground());

    this._barFiller = this.add(this._makeBarFiller());
  }

  _makeBackground () {
    return this.game.make.image(0, 0, 'splash-screen');
  }

  _makeBarFiller () {
    var bitmap = this.game.make.bitmapData(120, 10);

    bitmap.fill(255, 184, 184);

    return this.game.make.sprite(60, 130, bitmap);
  }

  // --------------------------------------------------------------------------

  get barFiller () {
    return this._barFiller;
  }

}


export default SplashScreen;
