import Base from './Base';


export default class Pink extends Base {

  _prepareEffect () {
    this.buffer.fill(107, 175, 245);
  }

  _closeEffect () {
    this.buffer.fill(0, 0, 0, 0);
  }

  _processEffect () {
    this.sprite.alpha = 1 - this.tweeningProperty;
  }

}
