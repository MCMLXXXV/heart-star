export default class Base {

  constructor (game, buffer, sprite) {
    this.game   = game;
    this.buffer = buffer;
    this.sprite = sprite;

    this.completed = new Phaser.Signal();
    this._tweeningProperty = 0;
  }

  // --------------------------------------------------------------------------

  reveal (duration) {
    this._tweenProperty(duration, 0, 1).start();
  }

  hide (duration) {
    this._tweenProperty(duration, 1, 0).start();
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
    // TODO: Override
  }

  _closeEffect () {
    // TODO: Override
  }

  _processEffect (/*value*/) {
    // TODO: Override
  }

  // --------------------------------------------------------------------------

  get tweeningProperty () {
    return this._tweeningProperty;
  }

  set tweeningProperty (value) {
    this._tweeningProperty = value;
    this._processEffect(value);
  }

}
