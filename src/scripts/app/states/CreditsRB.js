class CreditsRB extends Phaser.State {

  init () {
    this.game.transitions.registerTransition('fade-from-black');
  }

  create () {
    this.game.transitions.doTransition();

    this.add.existing(new BackgroundPattern(this.game, BackgroundPattern.MOON));
    this.add.image(0, 0, 'background-credits-rb');

    this.add.image(0, 0, 'label-credits-rb');

    this.add.existing(new BackButton(this.game));

    this._addLinkButtons(credits[ 'rb' ].links);
  }

  // --------------------------------------------------------------------------

  _makeLinkButton(x, { page, url }) {
    return new LinkButton(this.game, x, page, url);
  }

  _addLinkButtons (links) {
    var len      = links.length;
    var firstCol = 120 - (len - 1) * 16;

    for (var i = 0; i < len; ++i)
      this.add.existing(this._makeLinkButton(firstCol + 32 * i, links[i]));
  }

}


import credits from '../data/credits';

import BackButton        from '../objects/BackButton';
import LinkButton        from '../objects/LinkButton';
import BackgroundPattern from '../objects/BackgroundPattern';

export default CreditsRB;
