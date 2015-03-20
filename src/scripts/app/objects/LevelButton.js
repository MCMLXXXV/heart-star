class LevelButton extends Phaser.Button {

  constructor (game, x, y, level) {
    super(game, x, y, 'graphics');
    this.setFrames('button-level-locked', 'button-level-locked');

    this.position.set(x, y);

    this.level = level;
  }

  // --------------------------------------------------------------------------

  unlock () {
    let { level } = this;

    this.setFrames(`button-level-${level}-over`, `button-level-${level}-out`);
    this.input.useHandCursor = true;
  }

}


export default LevelButton;
