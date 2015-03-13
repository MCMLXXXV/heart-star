import credits from '../data/credits';

import LinkButton        from '../objects/LinkButton';
import MenuOptionButton  from '../objects/MenuOptionButton';
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
    this.add.image(0, 0, 'labels', label);
  }

  _makeLinkButton(x, page, url) {
    return new LinkButton(this.game, x, page, url);
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
    backButton.onInputUp.add(() => this._doTransition('Title'));

    if (addMoreButton) {
      let moreButton = this.add.existing(
        new MenuOptionButton(this.game, 192, 144, MenuOptionButton.MORE));
      moreButton.onInputUp.add(() => this._doTransition('Credits', 'rb'));
    }
  }

  _doTransition (stateName, ... params) {
    this.game.transitions.registerTransition('fade-to-black');
    this.game.transitions.registerTransitionCallback(
      () => this._goToState(stateName, ... params));
    this.game.transitions.doTransition();
  }

  _goToState (stateName, ... params) {
    this.game.state.start(stateName, true, false, ... params);
  }

}
