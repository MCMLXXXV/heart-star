export default class Logo extends Phaser.State {

  create () {
    this.stage.backgroundColor = 0x000000; // black

    var aiLogo = this.add.image(0, 0, 'logo-adventure-islands');
    var rbLogo = this.add.image(0, 0, 'logo-rb');
    rbLogo.alpha = 0; // Phaser BUG

    var [ first, second ] = this._makeLogoFadeEffect(aiLogo);
    var [      , last   ] = this._makeLogoFadeEffect(rbLogo, second);

    first.start();
    second.onComplete.addOnce(() => rbLogo.alpha = 1, this); // Phaser BUG
    last.onComplete.addOnce(this._goToNextState, this);
  }

  // --------------------------------------------------------------------------

  _makeTween (object, chainWith = null) {
    var tween = this.add.tween(object);

    if (chainWith !== null)
      chainWith.chain(tween);

    return tween;
  }

  _makeLogoFadeEffect (logo, chainWith = null) {
    var reveal = this._makeTween(logo, chainWith);
    var fade   = this._makeTween(logo, reveal);

    reveal.from({ alpha: 0 }, 1000, 'Sine.easeOut', false, 1500);
    fade.to({ alpha: 0 }, 1000, 'Sine.easeOut', false, 1500);

    return [ reveal, fade ];
  }

  _goToNextState () {
    this.state.start(this._nextState, true, false, 'iris');
  }

  // --------------------------------------------------------------------------

  get _nextState () {
    return 'Title';
  }

}
