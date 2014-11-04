class BackButton extends Phaser.Button {

  constructor(game) {
    super(game, 0, 0, 'button-menu-back', this._goToTitle, this, 1, 0);

    this.input.useHandCursor = true;
  }

  // --------------------------------------------------------------------------

  _goToTitle () {
    this.game.state.start('Title');
  }

}


export default BackButton;
