class Preload extends Phaser.State {

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
      this.state.start(this._nextState);
    }
  }

  // --------------------------------------------------------------------------

  _getSoundsToDecode () {
    return gameAssets['sfx'].map(function (sfx) { return sfx.key; });
  }

  _preparePreloadStage () {
    this._makePreloadInfo();
  }

  _makePreloadInfo () {
    this._preloadInfo = new PreloadInfo(this.game);

    this.load.setPreloadSprite(this._preloadInfo.barFiller);
  }

  _loadGraphicalAssets () {
    this.load.pack('graphics', null, gameAssets);
  }

  _loadAudioAssets () {
    if (this._webAudioSupported) {
      this.sound.onSoundDecode.add(this._unqueueDecodedSound, this);
      this.load.pack('sfx', null, gameAssets);
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

  get _nextState () {
    return 'Logo';
  }

}


import gameAssets from 'common/gameAssets';

import PreloadInfo from 'objects/PreloadInfo';

export default Preload;
