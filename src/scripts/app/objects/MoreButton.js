class BackButton extends Phaser.Button {

  constructor(game) {
    super(game, 192, 144, 'buttons', null, null, 'more-over', 'more-out');

    this.input.useHandCursor = true;
  }

}


export default BackButton;
