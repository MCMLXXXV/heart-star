class MenuButton extends Phaser.Button {

  constructor (game, y, key, nextState) {
    super(
      game, 120, y, 'buttons', this._doTransition, this,
      `${key}-over`, `${key}-out`);

    this.anchor.set(0.5, 0);
    this.input.useHandCursor = true;

    this.nextState = nextState;
    this.clicked = false;
  }

  // --------------------------------------------------------------------------

  _doTransition () {
    if (this.clicked) return;
    this.clicked = true;

    this.game.transitions.registerTransition('fade-to-black');
    this.game.transitions.registerTransitionCallback(this._goToNextState, this);
    this.game.transitions.doTransition();
  }

  _goToNextState () {
    this.game.state.start(this.nextState);
  }

}


export default MenuButton;
