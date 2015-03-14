export default class Transitions extends Phaser.Plugin {

  init () {
    this.effects = {};

    this.buffer = this._makeBuffer();
    this.game.stage.addChild(this.game.make.sprite(0, 0, this.buffer));
  }

  // --------------------------------------------------------------------------

  register (effectName, factory) {
    let effect = new factory(this.game, this.buffer);
    effect.completed.add(() => console.log('...'));

    this.effects[effectName] = effect;
  }

  clear () {
    this.buffer.clear();
  }

  reveal (effectName, duration, callback = () => {}, context = null) {
    let effect = this.effects[effectName];

    effect.reveal(duration);
    effect.completed.addOnce(callback, context);
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
