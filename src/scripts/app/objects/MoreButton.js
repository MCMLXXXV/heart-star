class BackButton extends Phaser.Button {

  constructor(game) {
    super(
      game, 240, 160, 'buttons', this._doTransition, this,
      'more-over', 'more-out');

    this.anchor.set(1);

    this.input.useHandCursor = true;
  }

  // --------------------------------------------------------------------------

  _doTransition () {
    this.game.transitions.registerTransition('fade-to-black');
    this.game.transitions.registerTransitionCallback(this._goToMoreCredits, this);
    this.game.transitions.doTransition();
  }

  _goToMoreCredits () {
    this.game.state.start('Credits', true, false, 'rb');
  }

}


export default BackButton;
