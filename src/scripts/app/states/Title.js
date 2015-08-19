import { menuButton } from '../components/uiButtons';

import BackgroundPattern from '../objects/BackgroundPattern';


export default class Title extends Phaser.State {

  init (effectName = 'iris') {
    this.game.transitions.reveal(
      effectName, 1000, this._makeMenuButtons, this);
  }

  create () {
    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'graphics', 'background-title');
    this.add.image(this.world.width, 0, 'graphics', 'version')
      .anchor.set(1, 0);
    this._addSwingingTitleLabel(18);
    this._placeCharacter('heart',  64);
    this._placeCharacter('star' , 176);
  }

  // --------------------------------------------------------------------------

  _makeMenuButtons () {
    const addButton = (y) => this.add.button(80, y, 'graphics');

    menuButton(addButton(110), 'start', 'Levels');
    menuButton(addButton(130), 'credits', 'Credits');
  }

  _placeCharacter (name, x) {
    const frames = Phaser.Animation.generateFrameNames(`actor-${name}-`, 4, 7, '', 2);
    const sprite = this.add.sprite(x, 96, 'sprites');

    sprite.anchor.set(0.5, 1);
    sprite.animations.add('main', frames, 4, true).play();
  }

  _addSwingingTitleLabel (y) {
    this.add.tween(this.add.image(0, y, 'graphics', 'title'))
      .to({ y: '+8' }, 1500, 'Quad.easeInOut')
      .to({ y: '-8' }, 1500, 'Quad.easeInOut')
      .loop()
      .start();
  }

}
