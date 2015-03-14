import Base from './Base';


export default class Blinds extends Base {

  reveal (duration) {
    this._tweenProperty(duration, 0, -1).start();
  }

  hide (duration) {
    this._tweenProperty(duration, 1, 0).start();
  }

  // --------------------------------------------------------------------------

  _prepareEffect () {
    this.sprite.alpha = 1;
  }

  _closeEffect () {
    this.buffer.blendSourceOver();
  }

  _processEffect (value) {
    let { buffer } = this;
    let { height } = buffer;

    buffer.blendSourceOver();
    buffer.fill(0, 0, 0);
    buffer.blendDestinationOut();

    for (let i = 0; i < 12; ++i) {
      buffer.rect(24 * i, 0, 24 * value, height);
    }
  }

}
