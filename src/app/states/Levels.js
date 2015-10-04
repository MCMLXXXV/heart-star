import levels from '../data/levels';

import scrollingPattern from '../components/scrollingPattern';
import {
  menuButton,
  levelButton
} from '../components/uiButtons';


export default class Levels extends Phaser.State {

  init () {
    this.game.transitions.reveal('blackout', 1000);
  }

  create () {
    const addBackButton = () => this.add.button(0, 0, 'graphics');

    scrollingPattern(this.game);
    this.add.image(0, 0, 'graphics', 'background-level-select');
    this.add.image(0, 32, 'graphics', 'level-select');
    menuButton(addBackButton(), 'back', 'Title', 'blackout');

    this.game.storage.getItem('levels', this._makeLevelButtons, this);
  }

  // --------------------------------------------------------------------------

  _makeLevelButtons (err, unlockedLevels) {
    const x = (n) => 48 + 32 * (n % 5);
    const y = (n) => 64 + 32 * Math.floor(n / 5);
    const addButton = (x, y) => this.add.button(x, y, 'graphics');

    if (unlockedLevels === null) {
      // The game is being played for the first time,
      // no unlocked levels yet.
      unlockedLevels = levels;
    }

    unlockedLevels.forEach(({ name: level, locked }, i) =>
      levelButton(addButton(x(i), y(i)), level, locked));
  }

}
