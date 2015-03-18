export default class Logo extends Phaser.State {

  create () {
    let logo = this.add.image(0, 0, 'labels', 'logo-adventure-islands');
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
