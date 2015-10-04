import Base from './Base';


export default class Blackout extends Base {

  _prepareEffect () {
    this.buffer.fill(0, 0, 0);
  }

  _processEffect () {
    this.sprite.alpha = 1 - this.tweeningProperty;
  }

}
