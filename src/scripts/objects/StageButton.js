class StageButton extends Phaser.Group {

  constructor (game, x, y, stageName, locked = true) {
    super(game);

    this.position.set(x, y);

    this.stageName = stageName;

    this._makeUnlockableButton(stageName, locked);
  }

  // --------------------------------------------------------------------------

  _makeUnlockableButton (stageName, locked) {
    if (locked) {
      this.add(this.game.make.image(0, 0, 'button-stage-locked'));
    }
    else {
      this.add(
        this.game.make.button(
          0, 0, this._getButtonTextureKey(stageName),
          this._doTransition, this, 1, 0));
    }
  }

  _doTransition () {
    this.game.transitions.registerTransition('fade-to-black');
    this.game.transitions.registerTransitionCallback(this._goToStageNumber, this);
    this.game.transitions.doTransition();
  }

  _goToStageNumber () {
    this.game.state.start('Game', true, false, this.stageName);
  }

  _getButtonTextureKey (stageName) {
    switch (stageName) {
      case '01': return 'button-stage-01';
      case '02': return 'button-stage-02';
      case '03': return 'button-stage-03';
      case '04': return 'button-stage-04';
      case '05': return 'button-stage-05';
      case '06': return 'button-stage-06';
      case '07': return 'button-stage-07';
      case '08': return 'button-stage-08';
      case '09': return 'button-stage-09';
      case '10': return 'button-stage-10';
    }
  }

}


export default StageButton;
