class Layer extends Phaser.Group {

  constructor (game, role) {
    super(game);
  }

  // --------------------------------------------------------------------------

  toggle (visible) {
    this.alpha = visible ? 1 : 0;
  }

}


export default Layer;
