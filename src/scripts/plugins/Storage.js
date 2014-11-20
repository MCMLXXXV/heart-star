class Storage extends Phaser.Plugin {

  constructor (game, parent) {
    super(game, parent);
  }

  init (name) {
    localforage.config({ name });
  }

  // --------------------------------------------------------------------------

  fetch (key, callback = () => {}, context = null) {
    localforage.getItem(
      key, function (err, value) { callback.call(context, err, value); });
  }

  store (key, value, callback = () => {}, context = null) {
    localforage.setItem(
      key, value, function (err, value) { callback.call(context, err, value); });
  }

}


export default Storage;
