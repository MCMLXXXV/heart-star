class Credits extends Phaser.State {

  init () {
    this.game.transitions.registerTransition('fade-from-black');
  }

  create () {
    this.game.transitions.doTransition();

    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-credits');

    this.add.image(0, 0, 'label-credits-rb');

    this.add.existing(new BackButton(this.game));

    this.add.existing(new LinkButton(this.game,  96, LinkButton.TWITTER));
    this.add.existing(new LinkButton(this.game, 128, LinkButton.DEVIANTART));
  }

  // --------------------------------------------------------------------------

}


import BackButton        from 'objects/BackButton';
import LinkButton        from 'objects/LinkButton';
import BackgroundPattern from 'objects/BackgroundPattern';

export default Credits;
