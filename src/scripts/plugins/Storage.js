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

  remove (key, callback = () => {}, context = null) {
    localforage.removeItem(key, this._wrap(callback, context));
  }

  clear (callback = () => {}, context = null) {
    localforage.clear(this._wrap(callback, context));
  }

  length (callback = () => {}, context = null) {
    localforage.length(this._wrap(callback, context));
  }

  key (keyIndex, callback = () => {}, context = null) {
    localforage.key(keyIndex, this._wrap(callback, context));
  }

  keys (callback = () => {}, context = null) {
    localforage.keys(this._wrap(callback, context));
  }

  iterate (iterator, iterContext, callback = () => {}, cbContext = null) {
    localforage.iterate(
      this._wrap(iterator, iterContext),
      this._wrap(callback, cbContext));
  }

  // --------------------------------------------------------------------------

  _wrap (callback, context) {
    return (... args) => { callback.apply(context, args); };
  }

}


export default Storage;
