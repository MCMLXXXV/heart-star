class StageButton extends Phaser.Group {

  constructor (game, x, y, stageName, buttonKey, locked = true) {
    super(game);

    this.position.set(x, y);

    this.clicked   = false;
    this.stageName = stageName;

    this._makeUnlockableButton(buttonKey, locked);
  }

  // --------------------------------------------------------------------------

  _makeUnlockableButton (key, locked) {
    if (locked) {
      this.add(this.game.make.image(0, 0, 'button-stage-locked'));
    }
    else {
      var button = this.game.make.button(0, 0, key, this._doTransition, this, 1, 0);
      this.add(button);
    }
  }

  _doTransition () {
    if (this.clicked) return;
    this.clicked = true;

    this.game.transitions.registerTransition('fade-to-black');
    this.game.transitions.registerTransitionCallback(this._goToStageNumber, this);
    this.game.transitions.doTransition();
  }

  _goToStageNumber () {
    this.game.state.start('Game', true, false, this.stageName);
  }

}


export default StageButton;
