class LevelButton extends Phaser.Group {

  constructor (game, x, y, level, locked = true) {
    super(game);

    this.position.set(x, y);

    this.level = level;

    this._makeUnlockableButton(level, locked);
  }

  // --------------------------------------------------------------------------

  _makeUnlockableButton (level, locked) {
    if (locked) {
      this.add(this.game.make.image(0, 0, 'button-level-locked'));
    }
    else {
      this.add(
        this.game.make.button(
          0, 0, this._getButtonTextureKey(level),
          this._doTransition, this, 1, 0));
    }
  }

  _doTransition () {
    this.game.transitions.registerTransition('fade-to-black');
    this.game.transitions.registerTransitionCallback(this._goToStageNumber, this);
    this.game.transitions.doTransition();
  }

  _goToStageNumber () {
    this.game.state.start('Game', true, false, this.level);
  }

  _getButtonTextureKey (level) {
    switch (level) {
      case '01': return 'button-level-01';
      case '02': return 'button-level-02';
      case '03': return 'button-level-03';
      case '04': return 'button-level-04';
      case '05': return 'button-level-05';
      case '06': return 'button-level-06';
      case '07': return 'button-level-07';
      case '08': return 'button-level-08';
      case '09': return 'button-level-09';
      case '10': return 'button-level-10';
    }
  }

}


export default LevelButton;
