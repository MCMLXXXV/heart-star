import credits from '../data/credits';

import {
  menuButton,
  linkButton
} from '../components/uiButtons';

import BackgroundPattern from '../objects/BackgroundPattern';

const DEFAULT_SCREEN = 'adventure-islands';


export default class Credits extends Phaser.State {

  init (screen = DEFAULT_SCREEN) {
    this.screen = screen;
  }

  create () {
    const { screen }            = this;
    const { background, links } = credits[screen];

    this._addBackground(background);
    this._addLinkButtons(links);
    this._addMenuButtons(screen, (screen === DEFAULT_SCREEN));

    this.game.transitions.reveal('blackout', 1000);
  }

  // --------------------------------------------------------------------------

  _addBackground ({ pattern, layer, label }) {
    this.add.existing(new BackgroundPattern(this.game, pattern));
    this.add.image(0, 0, 'graphics', layer);
    this.add.image(0, 0, 'graphics', label);
  }

  _addLinkButtons (links) {
    const firstCol = 120 - (links.length - 1) * 16;
    const x = (i) => firstCol + 32 * i;
    const addButton = (i) => this.add.button(x(i), 47, 'graphics');

    links.forEach(({ page, url }, i) => linkButton(addButton(i), page, url));
  }

  _addMenuButtons (screen, addMoreButton = false) {
    const addButton = (x, y) => this.add.button(x, y, 'graphics');

    menuButton(addButton(0, 0), 'back', 'Title', 'blackout');

    if (addMoreButton) {
      menuButton(addButton(192, 144), 'more', 'Credits', 'rb');
    }
  }

}
