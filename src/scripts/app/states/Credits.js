import credits from '../data/credits';

import MenuOptionButton  from '../objects/MenuOptionButton';
import BackgroundPattern from '../objects/BackgroundPattern';

const DEFAULT_SCREEN = 'adventure-islands';


export default class Credits extends Phaser.State {

  init (screen = DEFAULT_SCREEN) {
    this.screen = screen;
  }

  create () {
    let { screen }            = this;
    let { background, links } = credits[screen];

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

  _makeLinkButton (x, page, url) {
    const goToURL = (url) => () => window.open(url);

    const frameName = (page, state) => `button-link-${page}-${state}`;
    const overFrame = (page) => frameName(page, 'over');
    const outFrame  = (page) => frameName(page, 'out');

    const button = this.make.button(x, 47, 'graphics', goToURL(url));
    button.setFrames(overFrame(page), outFrame(page));
    button.anchor.set(0.5, 0);

    return button;
  }

  _addLinkButtons (links) {
    const firstCol = 120 - (links.length - 1) * 16;

    links.forEach(({ page, url }, i) => {
      let x = firstCol + 32 * i;
      this.add.existing(this._makeLinkButton(x, page, url));
    });
  }

  _addMenuButtons (screen, addMoreButton = false) {
    let backButton = this.add.existing(new MenuOptionButton(this.game, 0, 0));
    backButton.onInputUp.add(() => {
      this.game.transitions.toState('Title', 'blackout', 1000, 'blackout');
    });

    if (addMoreButton) {
      let moreButton = this.add.existing(
        new MenuOptionButton(this.game, 192, 144, MenuOptionButton.MORE));
      moreButton.onInputUp.add(() => {
        this.game.transitions.toState('Credits', 'blackout', 1000, 'rb');
      });
    }
  }

}
