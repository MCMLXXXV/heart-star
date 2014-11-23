class CreditsAI extends Phaser.State {

  init () {
    this.game.transitions.registerTransition('fade-from-black');
  }

  create () {
    this.game.transitions.doTransition();

    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-credits-ai');

    this.add.image(0, 0, 'label-credits-ai');

    this.add.existing(new BackButton(this.game));
    this.add.existing(new MoreButton(this.game));

    var links = [
      [  64, LinkButton.FACEBOOK,          'https://www.facebook.com/AdventureIslandsGames' ],
      [  96, LinkButton.TWITTER,           'https://twitter.com/AdventIslands'              ],
      [ 128, LinkButton.DEVIANTART,        'http://adventureislands.deviantart.com/'        ],
      [ 160, LinkButton.ADVENTURE_ISLANDS, 'http://simpanen.carbonmade.com/'                ]
    ];

    this._addLinkButtons(links);
  }

  // --------------------------------------------------------------------------

  _makeLinkButton([ x, faceTexture, url ]) {
    return new LinkButton(this.game, x, faceTexture, url);
  }

  _addLinkButtons (links) {
    for (var link of links)
      this.add.existing(this._makeLinkButton(link));
  }

}


import BackButton        from 'objects/BackButton';
import MoreButton        from 'objects/MoreButton';
import LinkButton        from 'objects/LinkButton';
import BackgroundPattern from 'objects/BackgroundPattern';

export default CreditsAI;
