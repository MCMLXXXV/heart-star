import credits from '../data/credits';

import BackButton        from '../objects/BackButton';
import MoreButton        from '../objects/MoreButton';
import LinkButton        from '../objects/LinkButton';
import BackgroundPattern from '../objects/BackgroundPattern';

const DEFAULT_SCREEN = 'adventure-islands';


export default class Credits extends Phaser.State {

  init (screen = DEFAULT_SCREEN) {
    this.screen = screen;

    this.game.transitions.registerTransition('fade-from-black');
  }

  create () {
    let { screen }            = this;
    let { background, links } = credits[screen];

    this._addBackground(background);
    this._addLinkButtons(links);
    this._addMenuButtons(screen, (screen === DEFAULT_SCREEN));

    this.game.transitions.doTransition();
  }

  // --------------------------------------------------------------------------

  _addBackground ({ pattern, layer, label }) {
    this.add.existing(new BackgroundPattern(this.game, pattern));
    this.add.image(0, 0, layer);
    this.add.image(0, 0, label);
  }

  _makeLinkButton(x, page, url) {
    return new LinkButton(this.game, x, page, url);
  }

  _addLinkButtons (links) {
    let firstCol = 120 - (links.length - 1) * 16;

    links.map(({ page, url }, i) => {
      let x = firstCol + 32 * i;
      this.add.existing(this._makeLinkButton(x, page, url));
    });
  }

  _addMenuButtons (screen, addMoreButton = false) {
    this.add.existing(new BackButton(this.game));

    if (addMoreButton)
      this.add.existing(new MoreButton(this.game));
  }

}
