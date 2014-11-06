class Credits extends Phaser.State {

  create () {
    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-credits');

    this.add.image(0, 0, 'label-credits');

    this.add.existing(new BackButton(this.game));

    this.add.existing(new LinkButton(this.game,  64, LinkButton.FACEBOOK));
    this.add.existing(new LinkButton(this.game,  96, LinkButton.TWITTER));
    this.add.existing(new LinkButton(this.game, 128, LinkButton.DEVIANTART));
    this.add.existing(new LinkButton(this.game, 160, LinkButton.ADVENTURE_ISLANDS));
  }

  // --------------------------------------------------------------------------

}


import BackButton        from 'objects/BackButton';
import LinkButton        from 'objects/LinkButton';
import BackgroundPattern from 'objects/BackgroundPattern';

export default Credits;