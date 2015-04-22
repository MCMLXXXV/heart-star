class LinkButton extends Phaser.Button {

  constructor (game, x, key, url = null) {
    super(game, x, 47, 'graphics', () => this._openPopup());
    this.setFrames(`button-link-${key}-over`, `button-link-${key}-out`);

    this.anchor.set(0.5, 0);

    this.input.useHandCursor = true;
    this.url = url;
  }

  // --------------------------------------------------------------------------

  _openPopup () {
    if (this.url !== null) window.open(this.url);
  }

}


export default LinkButton;
