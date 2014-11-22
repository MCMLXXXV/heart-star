class Storage extends Phaser.Plugin {

  constructor (game, parent) {
    super(game, parent);
  }

  init (name) {
    localforage.config({ name });
  }

  // --------------------------------------------------------------------------

  fetch (key, callback = () => {}, context = null) {
    localforage.getItem(key, this._wrap(callback, context));
  }

  store (key, value, callback = () => {}, context = null) {
    localforage.setItem(key, value, this._wrap(callback, context));
  }

  // --------------------------------------------------------------------------

  _wrap (callback, context) {
    return (... args) => { callback.apply(context, args); };
  }

}


export default Storage;
