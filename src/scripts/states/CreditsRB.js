class Credits extends Phaser.State {

  init () {
    this.game.transitions.registerTransition('fade-from-black');
  }

  create () {
    this.game.transitions.doTransition();

    this.add.existing(new BackgroundPattern(this.game, BackgroundPattern.MOON));
    this.add.image(0, 0, 'background-credits-rb');

    this.add.image(0, 0, 'label-credits-rb');

    this.add.existing(new BackButton(this.game));

    var links = [
      [  96, LinkButton.TWITTER, 'https://twitter.com/rb_lopes' ],
      [ 128, LinkButton.GITHUB,  'https://github.com/rblopes'   ]
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
import LinkButton        from 'objects/LinkButton';
import BackgroundPattern from 'objects/BackgroundPattern';

export default Credits;
