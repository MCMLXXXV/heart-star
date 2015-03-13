const BACK = 'back';
const MORE = 'more';


class BackButton extends Phaser.Button {

  constructor(game, x, y, type = BACK) {
    super(game, x, y, 'buttons', null, null, `${type}-over`, `${type}-out`);

    this.input.useHandCursor = true;
  }

}


BackButton.BACK = BACK;
BackButton.MORE = MORE;


export default BackButton;
