/**
 *  @author    Rafael Barbosa Lopes
 *  @copyright 2014 Rafael Barbosa Lopes
 *  @license   {@link https://github.com/rblopes/my-phaser-template/blob/dev/LICENSE|MIT License}
 */


import Phaser      from 'Phaser';
import localforage from 'localforage';


/**
 *  Wrapper plugin for Mozilla's {@link http://mozilla.github.io/localForage/|localForage} offline storage library.
 *
 *  @class Storage
 *  @extends {Phaser.Plugin}
 */
class Storage extends Phaser.Plugin {

  /**
   *  Initialize the localForage library for use with this game.
   *
   *  This method is used by `PluginManager#add`.
   *
   *  @param {string} name          - The storage name, in general, this game's name.
   *  @param {string} [version=1.0] - The storage version number.
   *  @private
   */
  init (name, version = '1.0') {
    localforage.config({ name, version });
  }

  /**
   *  Get an object from the storage library and supplies the result to the given callback.
   *
   *  @param {string}   key      - The referencing key of the object to be fetched.
   *  @param {function} callback - The asynchronous callback invoked after the operation completes.
   *  @param {object}   context  - The context of the callback.
   */
  getItem (key, callback, context) {
    localforage.getItem(key, this.wrapCallback(callback, context));
  }

  /**
   *  Saves the given object to the offline store.
   *
   *  @param {string}   key      - The referencing key of the object to be fetched.
   *  @param {*}        value    - The object to be stored.
   *  @param {function} callback - The asynchronous callback invoked after the operation completes.
   *  @param {object}   context  - The context of the callback.
   */
  setItem (key, value, callback, context) {
    localforage.setItem(key, value, this.wrapCallback(callback, context));
  }

  /**
   *  Removes the object identified by `key` from the offline store.
   *
   *  @param {string}   key      - The key to remove.
   *  @param {function} callback - The asynchronous callback invoked after the operation completes.
   *  @param {object}   context  - The context of the callback.
   */
  removeItem (key, callback, context) {
    localforage.removeItem(key, this.wrapCallback(callback, context));
  }

  /**
   *  Removes all keys from the database, returning it to a blank slate.
   *
   *  @param {function} callback - The asynchronous callback invoked after the operation completes.
   *  @param {object}   context  - The context of the callback.
   */
  clear (callback, context) {
    localforage.clear(this.wrapCallback(callback, context));
  }

  /**
   *  Gets the number of keys in the offline store (i.e. its "length").
   *
   *  @param {function} callback - The asynchronous callback invoked after the operation completes.
   *  @param {object}   context  - The context of the callback.
   */
  length (callback, context) {
    localforage.length(this.wrapCallback(callback, context));
  }

  /**
   *  Get the name of a key based on its ID.
   *
   *  @param {function} callback - The asynchronous callback invoked after the operation completes.
   *  @param {object}   context  - The context of the callback.
   */
  key (keyIndex, callback, context) {
    localforage.key(keyIndex, this.wrapCallback(callback, context));
  }

  /**
   *  Get the list of all keys in the datastore.
   *
   *  @param {function} callback - The asynchronous callback invoked after the operation completes.
   *  @param {object}   context  - The context of the callback.
   */
  keys (callback, context) {
    localforage.keys(this.wrapCallback(callback, context));
  }

  /**
   *  Iterate over all value/key pairs in datastore.
   *
   *  @param {function} iterator        - The iterator callback.
   *  @param {object}   iteratorContext - The iterator callback context.
   *  @param {function} callback        - The success callback.
   *  @param {object}   callbackContext - The success callback context.
   */
  iterate (iterator, iteratorContext, callback, callbackContext) {
    localforage.iterate(
      this.wrapCallback(iterator, iteratorContext),
      this.wrapCallback(callback, callbackContext));
  }

  // --------------------------------------------------------------------------

  /**
   *  Use internally to wrap both callback and context passed to the
   *  localForage methods.
   *
   *  @param {function} [callback=()=>{}]
   *  @param {object}   [context=null]
   *  @private
   */
  wrapCallback (callback = () => {}, context = null) {
    return function () { callback.apply(context, arguments); };
  }

}


export default Storage;
