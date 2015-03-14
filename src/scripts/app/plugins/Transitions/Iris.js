export default class Iris {

  constructor (game, buffer) {
    this.game   = game;
    this.buffer = buffer;

    this.completed = new Phaser.Signal();
    this._aperture = 0;
  }

  // --------------------------------------------------------------------------

  reveal (duration) {
    this.tweeningProperty = 0;

    this.game.add.tween(this)
      .to({ tweeningProperty: 1 }, duration)
      .start()
      .onComplete.addOnce(() => this.completed.dispatch());
  }

  hide (duration, callback, context) {
    this.tweeningProperty = 1;

    this.game.add.tween(this)
      .to({ tweeningProperty: 0 }, duration)
      .start()
      .onComplete.addOnce(callback, context);
  }

  // --------------------------------------------------------------------------

  _draw () {
    let { buffer, _aperture: aperture } = this;
    let { width, height } = buffer;
    const radius = Math.sqrt(width * width + height * height) / 2 * aperture;

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
    this._draw();
  }

}
