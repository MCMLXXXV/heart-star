class MenuButton extends Phaser.Button {

  constructor (game, y, key, nextState) {
    super(game, 120, y, key, this._goToNextState, this, 1, 0);

    this.anchor.set(0.5, 0);
    this.input.useHandCursor = true;

    this.nextState = nextState;
  }

  // --------------------------------------------------------------------------

  _goToNextState () {
    this.game.state.start(this.nextState);
  }

}


export default MenuButton;
