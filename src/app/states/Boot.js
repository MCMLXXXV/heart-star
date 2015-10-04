import assets from '../data/assets';

import Storage     from '../plugins/Storage';
import GameControl from '../plugins/GameControl';
import Transitions from '../plugins/Transitions';


export default class Boot extends Phaser.State {

  init () {
    this.load.path = 'assets/';

    this.game.storage     = this.game.plugins.add(Storage, 'heart-star');
    this.game.controls    = this.game.plugins.add(GameControl);
    this.game.transitions = this.game.plugins.add(Transitions);
  }

  preload () {
    this.load.pack('boot', null, assets);
  }

  create () {
    this._setupStage();

    this.state.start('Preload');
  }

  // --------------------------------------------------------------------------

  _setupStage () {
    this.input.maxPointers = 1;

    this.scale.pageAlignHorizontally   = true;
    this.stage.disableVisibilityChange = true;

    this.scale.setMinMax(480, 320, 720, 480);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.stage.smoothed = false;
  }

}
