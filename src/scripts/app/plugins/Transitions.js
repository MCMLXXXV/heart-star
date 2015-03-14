export default class Transitions extends Phaser.Plugin {

  init () {
    this.effects = {};

    this.buffer = this._makeBuffer();
    this.sprite = this.game.make.image(0, 0, this.buffer);
    this.game.stage.addChild(this.sprite);
  }

  // --------------------------------------------------------------------------

  register (effectName, factory) {
    let effect = new factory(this.game, this.buffer);
    effect.completed.add(() => console.log('...'));

    this.effects[effectName] = effect;
  }

  reveal (effectName, duration, callback = () => {}, context = null) {
    let effect = this.effects[effectName];

    effect.reveal(duration);
    effect.completed.addOnce(callback, context);
  }

  hide (effectName, duration, callback = () => {}, context = null) {
    // TODO
  }

  toState (stateName, effectName, duration, ... args) {
    let effect = this.effects[effectName];

    this.buffer.blendSourceOver();

    effect.hide(duration);
    effect.completed.addOnce(
      () => this.game.state.start(stateName, true, false, ... args));
  }

  // --------------------------------------------------------------------------

  _makeBuffer () {
    let { width, height } = this.game.world;

    return this.game.make.bitmapData(width, height);
  }

}
