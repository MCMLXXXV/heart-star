import Base from './Base';


export default class Pink extends Base {

  _prepareEffect () {
    this.buffer.fill(255, 122, 122);
  }

  _processEffect () {
    this.sprite.alpha = 1 - this.tweeningProperty;
  }

}
