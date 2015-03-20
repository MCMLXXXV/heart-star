import levels from '../data/levels';

import LevelButton       from '../objects/LevelButton';
import MenuOptionButton  from '../objects/MenuOptionButton';
import BackgroundPattern from '../objects/BackgroundPattern';


export default class Levels extends Phaser.State {

  init () {
    this.game.transitions.reveal('blackout', 1000);
  }

  create () {
    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'graphics', 'background-level-select');
    this.add.image(0, 32, 'graphics', 'level-select');

    let backButton = new MenuOptionButton(this.game, 0, 0);
    backButton.onInputUp.add(() => {
      this.game.transitions.toState('Title', 'blackout', 1000, 'blackout');
    });
    this.add.existing(backButton);

    this.game.storage.getItem('levels', this._addStageButtons, this);
  }

  // --------------------------------------------------------------------------

  _addStageButtons (err, unlockedLevels) {
    if (unlockedLevels === null) {
      // The game is being played for the first time,
      // no unlocked levels yet.
      unlockedLevels = levels;
    }

    const x = (n) => 48 + 32 * (n % 5);
    const y = (n) => 64 + 32 * Math.floor(n / 5);

    unlockedLevels
      .map(({ name, locked }, i) => [ x(i), y(i), name, locked ])
      .map((args) => this._makeLevelButton(... args))
      .forEach((button) => this.add.existing(button));
  }

  _makeLevelButton (x, y, level, locked) {
    let button = new LevelButton(this.game, x, y, level);

    if (!locked) {
      button.unlock();
      button.onInputUp.add(() => {
        this.game.transitions.toState('Game', 'blackout', 1000, level);
      });
    }

    return button;
  }

}
