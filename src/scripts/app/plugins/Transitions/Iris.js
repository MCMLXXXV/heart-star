export default class Iris {

  constructor (game, buffer) {
    this.game   = game;
    this.buffer = buffer;

    this.completed = new Phaser.Signal();
    this._aperture = 0;
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
    console.info('Iris effect preparation…');
  }

  _closeEffect () {
    console.info('Iris effect closure…');
    this.buffer.blendSourceOver();
  }

  _processEffect (value) {
    let { buffer } = this;
    let { width, height } = buffer;
    const radius = Math.sqrt(width * width + height * height) / 2 * value;

    buffer.blendSourceOver();
    buffer.fill(0, 0, 0);
    buffer.blendDestinationOut();
    buffer.circle(width / 2, height / 2, radius, 'white');
  }

  // --------------------------------------------------------------------------

  get tweeningProperty () {
    return this._aperture;
  }

  set tweeningProperty (value) {
    this._aperture = value;
    this._processEffect(value);
  }

}
