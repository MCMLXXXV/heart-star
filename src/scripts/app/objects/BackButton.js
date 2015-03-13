class BackButton extends Phaser.Button {

  constructor(game) {
    super(game, 0, 0, 'buttons', null, null, 'back-over', 'back-out');

    this.input.useHandCursor = true;
  }

}


export default BackButton;
