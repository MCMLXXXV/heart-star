class LinkButton extends Phaser.Button {

  constructor (game, x, key, url = null) {
    super(game, x, 47, this._getFaceTexture(key), this._openPopup, this, 1, 0);

    this.anchor.set(0.5, 0);

    this.input.useHandCursor = true;
    this.url = url;
  }

  // --------------------------------------------------------------------------

  _getFaceTexture (key) {
    switch (key) {
      case 'github'           : return 'button-link-github';
      case 'facebook'         : return 'button-link-facebook';
      case 'twitter'          : return 'button-link-twitter';
      case 'deviantart'       : return 'button-link-deviantart';
      case 'adventure-islands': return 'button-link-adventure-islands';
    }
  }

  _openPopup () {
    if (this.url !== null) window.open(this.url);
  }

}


export default LinkButton;
