import levels from '../data/levels';

import MenuButton        from '../objects/MenuButton';
import BackgroundPattern from '../objects/BackgroundPattern';


export default class Title extends Phaser.State {

  init (transitionName = 'fade-from-black') {
    this.game.transitions.registerTransition(transitionName);
    this.game.transitions.registerTransitionCallback(
      this._makeMenuButtons, this);
  }

  create () {
    this.game.transitions.doTransition();

    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-title');
    this.add.image(this.world.width, 0, 'label-version').anchor.set(1, 0);
    this._placeCharacter('character-heart',  64);
    this._placeCharacter('character-star' , 176);

    var titleLabel = this._addTitleLabel(18);
    this._swingTitleLabel(titleLabel);

    this.game.storage.getItem('levels', this._probeUnlockedStages, this);
  }

  // --------------------------------------------------------------------------

  _makeMenuButtons () {
    this.add.existing(new MenuButton(this.game, 110, 'button-menu-start', 'Levels'));
    this.add.existing(new MenuButton(this.game, 130, 'button-menu-credits', 'Credits'));
  }

  _placeCharacter (name, x) {
    var sprite = this.add.sprite(x, 96, name);

    sprite.anchor.set(0.5, 1);
    sprite.animations.add('star', [ 4, 5, 6, 7 ], 4, true).play();
  }

  _addTitleLabel (y) {
    return this.add.image(0, y, 'label-title');
  }

  _swingTitleLabel (image) {
    this.add.tween(image)
      .to({ y: '+8' }, 1500, 'Quad.easeInOut')
      .to({ y: '-8' }, 1500, 'Quad.easeInOut')
      .loop()
      .start();
  }

  _probeUnlockedStages (err, unlockedStages) {
    if (unlockedStages === null)
      this.game.storage.setItem('levels', levels);
  }

}
