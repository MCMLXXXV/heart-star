import defaultLevels    from '../data/levels';
import scrollingPattern from '../components/scrollingPattern';
import {
  menuButton,
  levelButton
}                       from '../components/uiButtons';


function showLevelButtons (g, levels) {
  const x = (n) => 48 + 32 * (n % 5);
  const y = (n) => 64 + 32 * Math.floor(n / 5);
  const button = (n) => g.add.button(x(n), y(n), 'graphics');

  if (levels === null) {
    // The game is being played for the first time,
    // no unlocked levels yet.
    levels = defaultLevels;
  }

  levels.forEach(
    ({ name, locked }, n) => levelButton(button(n), name, locked));
}


export default {

  init () {
    this.game.transitions.blackout.reveal({ duration: 1000 });
  },

  create () {
    const image = (x, y, k) => this.add.image(x, y, 'graphics', k);
    const button = (x, y) => this.add.button(x, y, 'graphics');

    scrollingPattern(this.game);
    image(0,  0, 'background-level-select');
    image(0, 32, 'level-select');

    menuButton(button(0, 0), 'back', 'Title', this.game.transitions.blackout);

    this.game.storage.getItem('levels')
      .then((levels) => showLevelButtons(this.game, levels));
  }

};
