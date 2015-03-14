import Base from './Base';


export default class Blackout extends Base {

  _prepareEffect () {
    if (!this._texture) {
      let { width, height } = this.game.world;
      this._texture = new Phaser.RenderTexture(this.game, width, height);
    }

    this._texture.renderXY(this.game.world, 0, 0, true);
    this.buffer.copy(this._texture.getImage());
  }

  _closeEffect () {
    this.buffer.clear();
  }

  _processEffect () {
    this.sprite.alpha = 1 - this.tweeningProperty;
  }

}
