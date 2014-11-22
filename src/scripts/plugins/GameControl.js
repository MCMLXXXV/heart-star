class GameControl extends Phaser.Plugin {

  constructor (game, parent) {
    super(game, parent);
  }

  init () {
    this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
  }

}


export default GameControl;
