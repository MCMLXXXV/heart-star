class Transitions extends Phaser.Plugin {

  constructor (game, parent) {
    super(game, parent);

    this.transitionCompleted  = new Phaser.Signal();
    this.transitionRunning    = false;
    this.transitionRegistered = null;

    this._group    = this.game.stage.addChild(this.game.make.group());
    this._blackout = this._group.add(this._makeBlackout());

    this._iris   = this._group.add(new Iris(this.game, 240, 160));
    this._blinds = this._group.add(new Blinds(this.game, 240, 160));

    this.transitionCompleted.add(this._clearRegisteredTransition, this);
  }

  // --------------------------------------------------------------------------

  registerTransition (transitionName) {
    if (this.transitionRunning) return;

    this.transitionRunning    = false;
    this.transitionRegistered = transitionName;
  }

  registerTransitionCallback (callback, context) {
    if (this.transitionRunning) return;

    this.transitionCompleted.addOnce(callback, context);
  }

  doTransition () {
    if (this.transitionRunning) return;

    this.transitionRunning = true;

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
    }
  }

  // --------------------------------------------------------------------------

  _makeBitmap (width, height) {
    var bitmap = this.game.make.bitmapData(width, height);

    bitmap.fill(255, 255, 255);

    return bitmap;
  }

  _makeImage (x, y, width, height, alpha = 0, tint = 0x000000) {
    var image = this.game.make.image(x, y, this._makeBitmap(width, height));

    image.alpha = alpha;
    image.tint  = tint;

    return image;
  }

  _makeBlackout () {
    return this._makeImage(0, 0, 240, 160);
  }

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
      .onComplete.addOnce(this.transitionCompleted.dispatch, this);
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

  _clearRegisteredTransition () {
    this.transitionRunning    = false;
    this.transitionRegistered = null;
  }

}


import Iris   from 'objects/Iris';
import Blinds from 'objects/Blinds';

export default Transitions;