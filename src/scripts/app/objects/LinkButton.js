class LinkButton extends Phaser.Button {

  constructor (game, x, key, url = null) {
    super(
      game, x, 47, 'buttons', this._openPopup, this,
      `link-${key}-over`, `link-${key}-out`);

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
