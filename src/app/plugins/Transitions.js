import Iris     from '../plugins/Transitions/Iris';
import Copy     from '../plugins/Transitions/Copy';
import Pink     from '../plugins/Transitions/Pink';
import Blinds   from '../plugins/Transitions/Blinds';
import SkyBlue  from '../plugins/Transitions/SkyBlue';
import Blackout from '../plugins/Transitions/Blackout';


export default class Transitions extends Phaser.Plugin {

  constructor (game, parent) {
    super(game, parent);

    this.effects = {};
    this._currentEffect = null;
  }

  init () {
    this.buffer = this._makeBuffer();
    this.sprite = this.game.make.image(0, 0, this.buffer);
    this.game.stage.addChild(this.sprite);

    this.register('iris',        Iris);
    this.register('copy',        Copy);
    this.register('blinds',      Blinds);
    this.register('blink-star',  SkyBlue);
    this.register('blink-heart', Pink);
    this.register('blackout',    Blackout);
  }

  // --------------------------------------------------------------------------

  register (effectName, factory) {
    let effect = new factory(this.game, this.buffer, this.sprite);

    effect.completed.add(() => {
      this._currentEffect = null;
    });

    this.effects[effectName] = effect;
  }

  reveal (effectName, duration, callback = () => {}, context = null) {
    if (this._currentEffect !== null) return;

    let effect = this._getEffect(effectName, callback, context);
    effect.reveal(duration);
  }

  hide (effectName, duration, callback = () => {}, context = null) {
    if (this._currentEffect !== null) return;

    let effect = this._getEffect(effectName, callback, context);
    effect.hide(duration);
  }

  toState (stateName, effectName, duration, ... args) {
    if (this._currentEffect !== null) return;

    let effect = this._getEffect(effectName, () => {}, null);

    effect.hide(duration);
    effect.completed.addOnce(
      () => this.game.state.start(stateName, true, false, ... args));
  }

  // --------------------------------------------------------------------------

  _makeBuffer () {
    let { width, height } = this.game.world;

    return this.game.make.bitmapData(width, height);
  }

  _getEffect (effectName, callback, context) {
    let effect = this.effects[effectName];

    effect.completed.addOnce(callback, context);

    this._currentEffect = effect;

    return effect;
  }

  // --------------------------------------------------------------------------

  get isRunning () {
    return this._currentEffect !== null;
  }

}
