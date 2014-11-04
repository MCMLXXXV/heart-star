class Logo extends Phaser.State {

  create () {
    this.stage.backgroundColor = 0x000000; // black

    var logo = this.add.image(
      this.world.centerX,
      this.world.centerY,
      'logo-adventure-islands');
    logo.anchor.set(0.5);

    var easingFunction = Phaser.Easing.Linear.Out;
    var fadeFromBlack = this.add.tween(logo);
    var fadeToBlack   = this.add.tween(logo);

    fadeFromBlack.from({ alpha: 0 }, 1000, easingFunction, false, 1000);
    fadeFromBlack.chain(fadeToBlack);

    fadeToBlack.to({ alpha: 0 }, 1000, easingFunction, false, 1000);
    fadeToBlack.onComplete.addOnce(this._goToNextState, this);

    fadeFromBlack.start();
  }

  // --------------------------------------------------------------------------

  _goToNextState () {
    this.state.start(this._nextState);
  }

  // --------------------------------------------------------------------------

  get _nextState () {
    return 'Title';
  }

}


export default Logo;
