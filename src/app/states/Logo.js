export default {

  create () {
    const logo = this.add.image(120, 80, 'graphics', 'logo-ai');
    logo.anchor.set(0.5);
    logo.alpha = 0;

    const changeLogo = () => logo.frameName = 'logo-rb';
    const goToTitle  = () => this.state.start('Title', true, false);

    const tween      = (o, ...e) => e.reduce((t, f) => (f(t), t), this.add.tween(o));
    const chain      = (t, ...ts) => (t.chain(...ts), t);
    const onComplete = (t, f) => (t.onComplete.addOnce(f), t);

    const fade   = (t) => t.to({ alpha: 0 }, 1000, 'Sine.easeOut', false, 1500);
    const reveal = (t) => t.to({ alpha: 1 }, 1000, 'Sine.easeOut', false, 1500);

    chain(
      onComplete(tween(logo, reveal, fade), changeLogo),
      onComplete(tween(logo, reveal, fade), goToTitle)
    ).start();
  }

};
