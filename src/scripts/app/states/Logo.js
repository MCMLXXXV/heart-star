export default class Logo extends Phaser.State {

  create () {
    const logo = this.add.image(120, 80, 'graphics', 'logo-ai');
    logo.anchor.set(0.5);
    logo.alpha = 0;

    const changeLogo = () => logo.frameName = 'logo-rb';
    const goToTitle  = () => this.state.start('Title', true, false, 'iris');
    const makeTween  = (callback) => {
      let tween = this.add.tween(logo)
        .to({ alpha: 1 }, 1000, 'Sine.easeOut', false, 1500)
        .to({ alpha: 0 }, 1000, 'Sine.easeOut', false, 1500);

      tween.onComplete.addOnce(callback);

      return tween;
    };

    makeTween(changeLogo)
      .chain(makeTween(goToTitle))
      .start();
  }

}
