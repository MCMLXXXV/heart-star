class StageButton extends Phaser.Group {

  constructor (game, x, y, stageName, buttonKey, locked = true) {
    super(game);

    this.position.set(x, y);

    this.stageName = stageName;

    this._makeUnlockableButton(buttonKey, locked);
  }

  // --------------------------------------------------------------------------

  _makeUnlockableButton (key, locked) {
    if (locked) {
      this.add(this.game.make.image(0, 0, 'button-stage-locked'));
    }
    else {
      var button = this.game.make.button(0, 0, key, this._goToStageNumber, this, 1, 0);
      this.add(button);
    }
  }

  _goToStageNumber () {
    console.log('Now, init\'ing stage "%s".', this.stageName);
    this.game.state.start('Game', true, false, this.stageName);
  }

}


export default StageButton;
