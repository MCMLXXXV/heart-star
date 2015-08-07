import levels from '../data/levels';

import { menuButton } from '../components/uiButtons';

import BackgroundPattern from '../objects/BackgroundPattern';


const LOCKED_FRAME_NAME = 'button-level-locked';


export default class Levels extends Phaser.State {

  init () {
    this.game.transitions.reveal('blackout', 1000);
  }

  create () {
    const addBackButton = () => this.add.button(0, 0, 'graphics');

    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'graphics', 'background-level-select');
    this.add.image(0, 32, 'graphics', 'level-select');
    menuButton(addBackButton(), 'back', 'Title', 'blackout');

    this.game.storage.getItem('levels', this._makeLevelButtons, this);
  }

  // --------------------------------------------------------------------------

  _makeLevelButtons (err, unlockedLevels) {
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
    const toState = (level) =>
      () => this.game.transitions.toState('Game', 'blackout', 1000, level);

    const frameName = (level, state) => `button-level-${level}-${state}`;
    const overFrame = (level) => frameName(level, 'over');
    const outFrame  = (level) => frameName(level, 'out');

    const button = this.make.button(x, y, 'graphics');
    button.setFrames(LOCKED_FRAME_NAME, LOCKED_FRAME_NAME);

    if (locked) {
      button.input.useHandCursor = false;
    }
    else {
      button.onInputUp.add(toState(level));
      button.setFrames(overFrame(level), outFrame(level));
    }

    return button;
  }

}
