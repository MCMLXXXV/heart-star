class SplashScreen extends Phaser.Group {

  constructor (game) {
    super(game);

    this.classType = Phaser.Image;

    this._addBackground();
    this.barFiller = this._addProgressBar();
  }

  // --------------------------------------------------------------------------

  _addBackground () {
    return this.create(0, 0, 'splash-screen');
  }

  _addProgressBar () {
    var bitmap = this.game.make.bitmapData(120, 10);

    bitmap.fill(255, 184, 184);

    return this.create(60, 130, bitmap);
  }

}


export default SplashScreen;
