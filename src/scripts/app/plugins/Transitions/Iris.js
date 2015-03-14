import Base from './Base';


export default class Iris extends Base {

  _closeEffect () {
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

}
