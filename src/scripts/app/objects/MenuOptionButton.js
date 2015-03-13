const BACK    = 'back';
const MORE    = 'more';
const START   = 'start';
const CREDITS = 'credits';


class MenuOptionButton extends Phaser.Button {

  constructor(game, x, y, type = BACK) {
    super(game, x, y, 'buttons', null, null, `${type}-over`, `${type}-out`);

    this.input.useHandCursor = true;
  }

}


MenuOptionButton.BACK    = BACK;
MenuOptionButton.MORE    = MORE;
MenuOptionButton.START   = START;
MenuOptionButton.CREDITS = CREDITS;


export default MenuOptionButton;
