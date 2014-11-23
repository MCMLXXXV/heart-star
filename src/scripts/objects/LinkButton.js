class LinkButton extends Phaser.Button {

  constructor (game, x, key, url = null) {
    super(game, x, 47, key, this._openPopup, this, 1, 0);

    this.input.useHandCursor = true;
    this.url = url;
  }

  // --------------------------------------------------------------------------

  _openPopup () {
    if (this.url !== null) window.open(this.url);
  }

}


LinkButton.GITHUB            = 'button-link-github';
LinkButton.FACEBOOK          = 'button-link-facebook';
LinkButton.TWITTER           = 'button-link-twitter';
LinkButton.DEVIANTART        = 'button-link-deviantart';
LinkButton.ADVENTURE_ISLANDS = 'button-link-adventure-islands';

export default LinkButton;
