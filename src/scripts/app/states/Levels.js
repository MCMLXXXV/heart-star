import StageButton       from '../objects/LevelButton';
import MenuOptionButton  from '../objects/MenuOptionButton';
import BackgroundPattern from '../objects/BackgroundPattern';


export default class Levels extends Phaser.State {

  init () {
    this.game.transitions.reveal('blackout', 1000);
  }

  create () {
    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-level-select');

    this.add.image(0, 32, 'labels', 'label-level-select');

    let backButton = new MenuOptionButton(this.game, 0, 0);
    backButton.onInputUp.add(() => {
      this.game.transitions.toState('Title', 'blackout', 1000, 'blackout');
    });
    this.add.existing(backButton);

    this.game.storage.getItem('levels', this._addStageButtons, this);
  }

  // --------------------------------------------------------------------------

  _addStageButtons (err, unlockedLevels) {
    for (let len = unlockedLevels.length, i = 0; i < len; ++i) {
      let { name, locked } = unlockedLevels[i];
      let x = 48 + 32 * (i % 5);
      let y = 64 + 32 * Math.floor(i / 5);

      this.add.existing(this._makeStageButton(x, y, name, locked));
    }
  }

  _makeStageButton (x, y, level, locked) {
    let button = new StageButton(this.game, x, y, level);

    if (!locked) {
      button.unlock();
      // button.onInputUp.add(() => this._doTransition('Game', level));
      button.onInputUp.add(() => this.state.start('Game', true, false, level));
    }

    return button;
  }

}
