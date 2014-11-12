class Transitions extends Phaser.Plugin {

  constructor (game, parent) {
    super(game, parent);

    this.transitionCompleted  = new Phaser.Signal();
    this.transitionRunning    = false;
    this.transitionRegistered = null;

    this._group    = this.game.stage.addChild(this.game.make.group());
    this._blackout = this._group.add(this._makeBlackout());

    this._iris       = this._group.add(new Iris(this.game, 240, 160));
    this._iris.alpha = 0;

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

  _fadeFromBlack () {
    this._fadeBlackout(1, 0);
  }

  _fadeToBlack () {
    this._fadeBlackout(0, 1);
  }

  _fadeBlackout (from, to) {
    var tween = this._makeTween(this._blackout);

    this._blackout.alpha = from;
    this._blackout.tint  = 0x000000;

    tween
      .to({ alpha: to }, 1000)
      .start();

    tween
      .onComplete.addOnce(this.transitionCompleted.dispatch, this);
  }

  _blink (color) {
    var tween = this._makeTween(this._blackout);

    this._blackout.alpha = 1;
    this._blackout.tint  = color;

    tween
      .to({ alpha: 0 }, 400)
      .start();
  }

  _openIris () {
    var tween = this._makeTween(this._iris);

    this._iris.alpha = 1;

    tween
      .to({ aperture: 1 }, 1000)
      .start();

    tween
      .onComplete.addOnce(this.transitionCompleted.dispatch, this);
  }

  _clearRegisteredTransition () {
    this.transitionRunning    = false;
    this.transitionRegistered = null;
  }

}


import Iris from 'objects/Iris';

export default Transitions;
