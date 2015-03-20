const BACK    = 'back';
const MORE    = 'more';
const START   = 'start';
const CREDITS = 'credits';


class MenuOptionButton extends Phaser.Button {

  constructor(game, x, y, type = BACK) {
    super(game, x, y, 'graphics');
    this.setFrames(`button-${type}-over`, `button-${type}-out`);

    this.input.useHandCursor = true;
  }

}


MenuOptionButton.BACK    = BACK;
MenuOptionButton.MORE    = MORE;
MenuOptionButton.START   = START;
MenuOptionButton.CREDITS = CREDITS;


export default MenuOptionButton;
