import assets from '../data/assets';


export default class Preload extends Phaser.State {

  preload () {
    this._displaySplashScreen();
    this.load.pack('graphics', null, assets);
  }

  create () {
    this.state.start('Logo');
  }

  // --------------------------------------------------------------------------

  _displaySplashScreen () {
    this.add.image(0, 0, 'splash-screen');
    this.load.setPreloadSprite(
      this.add.bitmapData(120, 10)
        .fill(255, 184, 184)
        .addToWorld(60, 130));
  }

}
