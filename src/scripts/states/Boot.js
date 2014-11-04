class Boot extends Phaser.State {

  // Initialize any plugins and start physics system.
  init () {
    this.load.baseURL = './assets/';

    this.game.controls = this.game.plugins.add(GameControl);

    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  preload () {
    this.load.pack('bootAssets', null, gameAssets);
  }

  create () {
    this._setupStage();

    this.state.start(this._nextState);
  }

  // --------------------------------------------------------------------------

  _setupStage () {
    this.input.maxPointers = 1;

    this.scale.pageAlignHorizontally   = true;
    this.scale.pageAlignVertically     = true;
    this.stage.disableVisibilityChange = true;

    this.scale.setMinMax(720, 480, 960, 640);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.setScreenSize(true);

    this.stage.smoothed = false;
  }

  // --------------------------------------------------------------------------

  get _nextState () {
    return 'Preload';
  }

}


import gameAssets from 'common/gameAssets';

import GameControl from 'plugins/GameControl';

export default Boot;
