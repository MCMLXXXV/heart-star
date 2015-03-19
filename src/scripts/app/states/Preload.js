import assets from '../data/assets';

import SplashScreen from '../objects/SplashScreen';


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
    let splashScreen = new SplashScreen(this.game);

    this.load.setPreloadSprite(splashScreen.barFiller);
  }

}
