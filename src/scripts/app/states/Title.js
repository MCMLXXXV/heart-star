import levels from '../data/levels';

import MenuOptionButton  from '../objects/MenuOptionButton';
import BackgroundPattern from '../objects/BackgroundPattern';


export default class Title extends Phaser.State {

  // init (transitionName = 'fade-from-black') {
  //   this.game.transitions.registerTransition(transitionName);
  //   this.game.transitions.registerTransitionCallback(
  //     () => this._makeMenuButtons());
  // }

  create () {
    // this.game.transitions.doTransition();

    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-title');
    this.add.image(this.world.width, 0, 'labels', 'label-version').anchor.set(1, 0);
    this._addSwingingTitleLabel(18);
    this._placeCharacter('heart',  64);
    this._placeCharacter('star' , 176);

    this._makeMenuButtons();

    this.game.storage.getItem('levels', this._probeUnlockedStages, this);
  }

  // --------------------------------------------------------------------------

  _makeMenuButtons () {
    this.add.existing(
      this._makeMenuOptionButton(110, MenuOptionButton.START, 'Levels'));
    this.add.existing(
      this._makeMenuOptionButton(130, MenuOptionButton.CREDITS, 'Credits'));
  }

  _makeMenuOptionButton(y, type, stateName) {
    let button = new MenuOptionButton(this.game, 80, y, type);

    // button.onInputUp.add(() => this._doTransition(stateName));
    button.onInputUp.add(() => this.state.start(stateName));

    return button;
  }

  _placeCharacter (name, x) {
    let sprite = this.add.sprite(x, 96, `character-${name}`);

    sprite.anchor.set(0.5, 1);
    sprite.animations.add('main', [ 4, 5, 6, 7 ], 4, true).play();
  }

  _addSwingingTitleLabel (y) {
    this.add.tween(this.add.image(0, y, 'labels', 'label-title'))
      .to({ y: '+8' }, 1500, 'Quad.easeInOut')
      .to({ y: '-8' }, 1500, 'Quad.easeInOut')
      .loop()
      .start();
  }

  _probeUnlockedStages (err, unlockedStages) {
    if (unlockedStages === null)
      this.game.storage.setItem('levels', levels);
  }

  // _doTransition (stateName, ... params) {
  //   this.game.transitions.registerTransition('fade-to-black');
  //   this.game.transitions.registerTransitionCallback(
  //     () => this._goToState(stateName, ... params));
  //   this.game.transitions.doTransition();
  // }

  // _goToState (stateName, ... params) {
  //   this.game.state.start(stateName, true, false, ... params);
  // }

}
