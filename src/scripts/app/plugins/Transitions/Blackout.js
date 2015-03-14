export default class Iris {

  constructor (game, buffer, sprite) {
    this.game   = game;
    this.buffer = buffer;
    this.sprite = sprite;

    this.completed = new Phaser.Signal();
    this._alpha = 0;
  }

  // --------------------------------------------------------------------------

  reveal (duration) {
    this._tweenProperty(duration, 1, 0).start();
  }

  hide (duration) {
    this._tweenProperty(duration, 0, 1).start();
  }

  // --------------------------------------------------------------------------

  _tweenProperty (duration, initialValue, finalValue) {
    this.tweeningProperty = initialValue;

    this._prepareEffect();

    let tween = this.game.add.tween(this)
      .to({ tweeningProperty: finalValue }, duration);

    tween.onComplete.addOnce(() => this.completed.dispatch());
    tween.onComplete.addOnce(() => this._closeEffect());

    return tween;
  }

  _prepareEffect () {
    console.info('Blackout effect preparation…');

    this.buffer.fill(0, 0, 0);
  }

  _closeEffect () {
    console.info('Blackout effect closure…');

    this.buffer.fill(0, 0, 0, 0);
  }

  _processEffect () {
    this.sprite.alpha = this.tweeningProperty;
  }

  // --------------------------------------------------------------------------

  get tweeningProperty () {
    return this._alpha;
  }

  set tweeningProperty (value) {
    this._alpha = value;
    this._processEffect();
  }

}
