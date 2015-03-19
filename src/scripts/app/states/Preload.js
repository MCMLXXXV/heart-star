import assets from '../data/assets';

import SplashScreen from '../objects/SplashScreen';


export default class Preload extends Phaser.State {

  init () {
    this._soundsToDecode = this._getSoundsToDecode();

    this._assetsReady = false;
  }

  preload () {
    this._preparePreloadStage();

    this._loadGraphicalAssets();
    // this._loadAudioAssets();
  }

  create () {
    this._assetsReady = true;
  }

  update () {
    if (this._assetsReady && this._allSoundsDecoded) {
      this.state.start('Logo');
    }
  }

  // --------------------------------------------------------------------------

  _getSoundsToDecode () {
    if (this._webAudioSupported)
      return assets['sfx'].map((sfx) => sfx.key);

    return [];
  }

  _preparePreloadStage () {
    this._makePreloadInfo();
  }

  _makePreloadInfo () {
    this._splashScreen = new SplashScreen(this.game);

    this.load.setPreloadSprite(this._splashScreen.barFiller);
  }

  _loadGraphicalAssets () {
    this.load.pack('graphics', null, assets);
  }

  _loadAudioAssets () {
    if (this._webAudioSupported) {
      this.sound.onSoundDecode.add(this._unqueueDecodedSound, this);
      this.load.pack('sfx', null, assets);
    }
  }

  _unqueueDecodedSound (key) {
    var position = this._soundsToDecode.indexOf(key);

    if (position > -1)
      this._soundsToDecode.splice(position, 1);
  }

  // --------------------------------------------------------------------------

  get _allSoundsDecoded () {
    return this._soundsToDecode.length === 0;
  }

  get _webAudioSupported () {
    return this.game.device.webAudio;
  }

}
