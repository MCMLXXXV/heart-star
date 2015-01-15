import Copy     from './Transitions/Copy';
import Iris     from './Transitions/Iris';
import Blinds   from './Transitions/Blinds';
import Blackout from './Transitions/Blackout';


class Transitions extends Phaser.Plugin {

  init () {
    this.transitionCompleted  = new Phaser.Signal();
    this.transitionRegistered = null;

    this._runningTransition         = null;
    this._previousRunningTransition = null;

    this._group    = this.game.stage.addChild(this.game.make.group());

    this._copy     = this._group.add(new Copy(this.game, 240, 160));
    this._iris     = this._group.add(new Iris(this.game, 240, 160));
    this._blinds   = this._group.add(new Blinds(this.game, 240, 160));
    this._blackout = this._group.add(new Blackout(this.game, 240, 160));

    this.transitionCompleted.add(this._clearRegisteredTransition, this);
  }

  // --------------------------------------------------------------------------

  registerTransition (transitionName) {
    if (this.transitionRunning) return;

    this.transitionRegistered = transitionName;
  }

  registerTransitionCallback (callback, context) {
    if (this.transitionRunning) return;

    this.transitionCompleted.addOnce(callback, context);
  }

  doTransition () {
    if (this.transitionRunning) return;

    if (this._previousRunningTransition !== null) {
      this._previousRunningTransition.clear();
    }

    switch (this.transitionRegistered) {
      case 'iris':
        this._openIris();
        break;
      case 'blinds-open':
        this._openBlinds();
        break;
      case 'blinds-close':
        this._closeBlinds();
        break;
      case 'fade-from-black':
        this._fadeFromBlack();
        break;
      case 'fade-to-black':
        this._fadeToBlack();
        break;
      case 'blink-pink':
        this._blink(0xff7a7a);
        break;
      case 'blink-blue':
        this._blink(0x6baff5);
        break;
      case 'copy':
        this._copyScreen();
        break;
    }
  }

  // --------------------------------------------------------------------------

  _makeTween (object) {
    return this.game.add.tween(object);
  }

  _doTransition (object, property, from, to, interval, delay = 0) {
    var tween = this._makeTween(object);

    object[property] = from;

    tween
      .to({ [property]: to }, interval)
      .delay(delay)
      .start();

    tween
      .onComplete.addOnce(() => this.transitionCompleted.dispatch(), this);

    this._runningTransition = object;
  }

  _openIris () {
    this._doTransition(this._iris, 'aperture', 0, 1, 1000);
  }

  _openBlinds () {
    this._doTransition(this._blinds, 'aperture', 1, 0, 1000);
  }

  _closeBlinds () {
    this._doTransition(this._blinds, 'aperture', 0, -1, 1000);
  }

  _fadeFromBlack () {
    this._blackout.tint = 0x000000;
    this._doTransition(this._blackout, 'alpha', 1, 0, 1000, 0);
  }

  _fadeToBlack () {
    this._blackout.tint = 0x000000;
    this._doTransition(this._blackout, 'alpha', 0, 1, 1000, 0);
  }

  _blink (color) {
    this._blackout.tint = color;
    this._doTransition(this._blackout, 'alpha', 1, 0, 400, 0);
  }

  _copyScreen () {
    this._copy.copyScreen();
    this._doTransition(this._copy, 'alpha', 1, 0, 400, 100);
  }

  _clearRegisteredTransition () {
    this._previousRunningTransition = this._runningTransition;
    this._runningTransition         = null;
    this.transitionRegistered       = null;
  }

  // --------------------------------------------------------------------------

  get transitionRunning () {
    return this._runningTransition !== null;
  }

}


export default Transitions;
