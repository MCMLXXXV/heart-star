class LinkButton extends Phaser.Button {

  constructor (game, x, key) {
    super(game, x, 47, key, this._openPopup, this, 1, 0);

    this.input.useHandCursor = true;
  }

  // --------------------------------------------------------------------------

  _openPopup () {
    // TODO
    console.info('Launching pop-up for "%s".', this._url);
  }

  // --------------------------------------------------------------------------

  get _url () {
    // if (this.key === LinkButton.FACEBOOK) {
    //   return 'fb';
    // }
    // else if (this.key === LinkButton.TWITTER) {
    //   return 'tt';
    // }
    // else if (this.key === LinkButton.DEVIANTART) {
    //   return 'da';
    // }
    // else if (this.key === LinkButton.ADVENTURE_ISLANDS) {
    //   return 'ai';
    // }
    return this.key;
  }
}


LinkButton.GITHUB            = 'button-link-github';
LinkButton.FACEBOOK          = 'button-link-facebook';
LinkButton.TWITTER           = 'button-link-twitter';
LinkButton.DEVIANTART        = 'button-link-deviantart';
LinkButton.ADVENTURE_ISLANDS = 'button-link-adventure-islands';

export default LinkButton;
