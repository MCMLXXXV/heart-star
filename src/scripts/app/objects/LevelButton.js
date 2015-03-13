class LevelButton extends Phaser.Button {

  constructor (game, x, y, level) {
    super(game, x, y, 'buttons', null, null, 'level-locked', 'level-locked');

    this.position.set(x, y);

    this.level = level;
  }

  // --------------------------------------------------------------------------

  unlock () {
    let { level } = this;

    this.setFrames(`level-${level}-over`, `level-${level}-out`);
    this.input.useHandCursor = true;
  }

}


export default LevelButton;
