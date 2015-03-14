export default class Iris {

  constructor (game, buffer) {
    this.game   = game;
    this.buffer = buffer;

    this.completed = new Phaser.Signal();
    this._alpha = 0;
  }

  // --------------------------------------------------------------------------

  reveal (duration) {
    this.tweeningProperty = 1;

    this.game.add.tween(this)
      .to({ tweeningProperty: 0 }, duration)
      .start()
      .onComplete.addOnce(() => this.completed.dispatch());
  }

  hide (duration) {
    this.tweeningProperty = 0;

    this.game.add.tween(this)
      .to({ tweeningProperty: 1 }, duration)
      .start()
      .onComplete.addOnce(() => this.completed.dispatch());
  }

  // --------------------------------------------------------------------------

  _draw () {
    this.buffer.clear();
    this.buffer.fill(0, 0, 0, this.tweeningProperty);
  }

  // --------------------------------------------------------------------------

  get tweeningProperty () {
    return this._alpha;
  }

  set tweeningProperty (value) {
    this._alpha = value;
    this._draw();
  }

}
