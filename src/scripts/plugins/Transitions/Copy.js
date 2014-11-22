class Copy extends Phaser.Image {

  constructor (game, width, height) {
    this._texture = new PIXI.RenderTexture(
      game.width, game.height, game.renderer);

    super(game, 0, 0, this._texture);

    this.clear();
  }

  // --------------------------------------------------------------------------

  copyScreen () {
    this._texture.render(this.game.world);
  }

  clear () {
    this.alpha = 0;
  }

}


export default Copy;
