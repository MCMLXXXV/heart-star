import assets from '../data/assets';

import Storage     from '../plugins/Storage';
import GameControl from '../plugins/GameControl';
import Transitions from '../plugins/Transitions';

import Iris     from '../plugins/Transitions/Iris';
// import Copy     from '../plugins/Transitions/Copy';
import Pink     from '../plugins/Transitions/Pink';
import Blinds   from '../plugins/Transitions/Blinds';
import SkyBlue  from '../plugins/Transitions/SkyBlue';
import Blackout from '../plugins/Transitions/Blackout';


export default class Boot extends Phaser.State {

  // Initialize any plugins and start physics system.
  init () {
    this.load.baseURL = './assets/';

    this.game.storage  = this.game.plugins.add(Storage, 'heart-star');
    this.game.controls = this.game.plugins.add(GameControl);

    this.game.transitions = this.game.plugins.add(Transitions);
    this.game.transitions.register('iris',     Iris);
    // this.game.transitions.register('copy',     Copy);
    this.game.transitions.register('pink',     Pink);
    this.game.transitions.register('blinds',   Blinds);
    this.game.transitions.register('sky-blue', SkyBlue);
    this.game.transitions.register('blackout', Blackout);

    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  preload () {
    this.load.pack('bootAssets', null, assets);
  }

  create () {
    this._setupStage();

    this.state.start(this._nextState);
  }

  // --------------------------------------------------------------------------

  _setupStage () {
    this.input.maxPointers = 1;

    this.scale.pageAlignHorizontally   = true;
    this.stage.disableVisibilityChange = true;

    this.scale.setMinMax(720, 480, 960, 640);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.stage.smoothed = false;
  }

  // --------------------------------------------------------------------------

  get _nextState () {
    return 'Preload';
  }

}
