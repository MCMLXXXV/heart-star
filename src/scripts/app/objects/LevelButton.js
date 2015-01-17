const DISABLED_BUTTON_FRAME = 'button-level-locked';


class LevelButton extends Phaser.Button {

  constructor (game, x, y, level, locked = true) {
    super(game, x, y, DISABLED_BUTTON_FRAME);

    this.position.set(x, y);

    this.level = level;

    if (!locked)
      this._unlockButton(level);
  }

  // --------------------------------------------------------------------------

  _unlockButton (level) {
    this.loadTexture(this._getButtonTextureKey(level));
    this.setFrames(1, 0);
    this.input.useHandCursor = true;
    this.onInputUp.add(this._doTransition, this);
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
    return `button-level-${level}`;
  }

}


export default LevelButton;
